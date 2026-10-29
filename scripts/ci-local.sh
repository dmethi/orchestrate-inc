#!/usr/bin/env bash
# Local CI for the Orchestrate site. GitHub-hosted Actions no longer run (founder,
# 2026-10-29); this script on the Studio is the gate. It runs the jobs the old
# workflows ran (ci.yml, semgrep.yml and, with --full, security-scheduled.yml)
# against the committed HEAD.
#
# Usage:
#   scripts/ci-local.sh                 run every PR job on HEAD
#   scripts/ci-local.sh --full          also run the old weekly scans: OSV over every
#                                       lockfile and the production header smoke test
#   scripts/ci-local.sh --pr N --post-status
#                                       also post a `local-ci` commit status on HEAD,
#                                       which scripts/merge-pr.sh requires
#
# The tracked tree must be clean: the status claims a commit, so the run must test it.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

pr=""
post_status=false
full=false
while [ $# -gt 0 ]; do
  case "$1" in
    --pr) pr="$2"; shift 2 ;;
    --post-status) post_status=true; shift ;;
    --full) full=true; shift ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done
if $post_status && [ -z "$pr" ]; then
  echo "--post-status needs --pr N" >&2
  exit 2
fi
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo "Tracked changes are not committed. Commit them, then rerun." >&2
  exit 2
fi

sha="$(git rev-parse HEAD)"
repo="dmethi/orchestrate-inc"
log_dir="$(mktemp -d "${TMPDIR:-/tmp}/orchestrate-ci.XXXXXX")"
failed=()
passed=()

# A clean export of HEAD, like the old fresh checkout. Secret and OSV scans read
# it so node_modules, dist and untracked files don't leak into the result.
export_dir="$log_dir/tree"
mkdir -p "$export_dir"
git archive HEAD | tar -x -C "$export_dir"

post() { # state description
  $post_status || return 0
  gh api --method POST "repos/$repo/statuses/$sha" \
    -f state="$1" -f context=local-ci -f description="$2" >/dev/null
}

job() { # name command...
  local name="$1"; shift
  local log="$log_dir/$name.log"
  local start=$SECONDS
  if "$@" >"$log" 2>&1; then
    passed+=("$name")
    printf '  ok    %-22s %3ss\n' "$name" $((SECONDS - start))
  else
    failed+=("$name")
    printf '  FAIL  %-22s %3ss  (log: %s)\n' "$name" $((SECONDS - start)) "$log"
    tail -20 "$log" | sed 's/^/        /'
  fi
}

secrets() {
  gitleaks dir --redact=100 --no-banner "$export_dir"
}

semgrep_rules() {
  ci/semgrep/validate-rules.sh &&
    semgrep scan --strict --config .semgrep.yml --error --metrics=off \
      --disable-version-check --exclude ci/semgrep/fixtures
}

osv() {
  osv-scanner scan --recursive "$export_dir"
}

echo "local-ci on ${sha:0:12}${pr:+ (PR #$pr)}$($full && echo " --full" || true)"
post pending "running on the Studio"

job secrets secrets
job semgrep semgrep_rules
job install npm ci
if [[ " ${passed[*]} " == *" install "* ]]; then
  job typecheck npm run typecheck
  rm -rf dist
  job build npm run build
  # Reads dist/, so it only means something after a passing build.
  [[ " ${passed[*]} " == *" build "* ]] && job security-config npm run check:security-config
  job audit npm audit --omit=dev --audit-level=high
fi
if $full; then
  job osv osv
  job deployed-headers npm run check:deployed-headers
fi

if [ ${#failed[@]} -eq 0 ]; then
  echo "local-ci passed: ${#passed[@]} jobs."
  post success "${#passed[@]} jobs passed on the Studio"
  rm -rf "$log_dir"
else
  echo "local-ci failed: ${failed[*]}"
  post failure "failed: ${failed[*]}"
  exit 1
fi
