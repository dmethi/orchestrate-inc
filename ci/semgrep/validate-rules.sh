#!/usr/bin/env bash
set -euo pipefail
repo_root="$(git rev-parse --show-toplevel)"
result_file="$(mktemp)"
trap 'rm -f "$result_file"' EXIT
cd "$repo_root"
semgrep scan --config .semgrep.yml --json --metrics=off --disable-version-check ci/semgrep/fixtures >"$result_file"
python3 - "$result_file" <<'PY'
import json
import sys
expected = {"orchestrate.no-public-form", "orchestrate.no-unsafe-dom-html", "orchestrate.no-runtime-data-collection", "orchestrate.no-browser-storage", "orchestrate.no-runtime-environment-config"}
with open(sys.argv[1], encoding="utf-8") as result:
    found = {item["check_id"] for item in json.load(result)["results"]}
missing = expected - found
if missing:
    raise SystemExit(f"Semgrep regression fixtures missed rules: {sorted(missing)}")
print(f"Semgrep rule fixtures passed ({len(expected)} rules).")
PY
