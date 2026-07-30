#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
unsafe_result="$(mktemp)"
safe_result="$(mktemp)"
trap 'rm -f "$unsafe_result" "$safe_result"' EXIT
cd "$repo_root"

semgrep scan --strict --config .semgrep.yml --json --metrics=off --disable-version-check ci/semgrep/fixtures/unsafe.tsx >"$unsafe_result"
semgrep scan --strict --config .semgrep.yml --json --metrics=off --disable-version-check ci/semgrep/fixtures/safe.tsx >"$safe_result"

python3 - "$unsafe_result" "$safe_result" <<'PY'
import json
import sys

expected = {"orchestrate.no-public-form", "orchestrate.no-unsafe-dom-html", "orchestrate.no-runtime-data-collection", "orchestrate.no-browser-storage", "orchestrate.no-runtime-environment-config"}
with open(sys.argv[1], encoding="utf-8") as result:
    found = {item["check_id"] for item in json.load(result)["results"]}
with open(sys.argv[2], encoding="utf-8") as result:
    safe_findings = json.load(result)["results"]

if found != expected:
    raise SystemExit(f"Semgrep unsafe fixtures: expected {sorted(expected)}, found {sorted(found)}")
if safe_findings:
    raise SystemExit(f"Semgrep safe fixtures produced findings: {safe_findings}")
print(f"Semgrep adversarial fixtures passed ({len(expected)} rules; safe fixture clean).")
PY
