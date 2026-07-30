#!/usr/bin/env bash
set -euo pipefail

script_dir="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(CDPATH= cd -- "$script_dir/../.." && pwd)"
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
    unsafe_findings = json.load(result)["results"]
    found = {item["check_id"] for item in unsafe_findings}
with open(sys.argv[2], encoding="utf-8") as result:
    safe_findings = json.load(result)["results"]

if found != expected:
    raise SystemExit(f"Semgrep unsafe fixtures: expected {sorted(expected)}, found {sorted(found)}")
required_qualified_globals = {
    ("orchestrate.no-runtime-data-collection", 9),
    ("orchestrate.no-runtime-data-collection", 10),
    ("orchestrate.no-runtime-data-collection", 12),
    ("orchestrate.no-runtime-data-collection", 14),
    ("orchestrate.no-browser-storage", 19),
    ("orchestrate.no-browser-storage", 20),
    ("orchestrate.no-browser-storage", 22),
    ("orchestrate.no-browser-storage", 24),
}
qualified_findings = {
    (item["check_id"], item["start"]["line"])
    for item in unsafe_findings
}
missing_qualified_globals = required_qualified_globals - qualified_findings
if missing_qualified_globals:
    raise SystemExit(
        "Semgrep missed qualified global privacy violations: "
        f"{sorted(missing_qualified_globals)}"
    )
if safe_findings:
    raise SystemExit(f"Semgrep safe fixtures produced findings: {safe_findings}")
print(f"Semgrep adversarial fixtures passed ({len(expected)} rules; safe fixture clean).")
PY
