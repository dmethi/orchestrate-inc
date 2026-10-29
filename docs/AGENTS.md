# Orchestrate Site Agent Guidance

Read, in order:

1. `../../shared-agent-config/portfolio/STUDIO_LINEAR.md`
2. `docs/modules/_index.md`
3. The relevant module cards
4. `SCRATCHPAD.md`
5. `docs/ENGINEERING_PRINCIPLES.md`

Product-code implementation requires an authorizing Studio Linear issue.
`docs/IDEAS.md` is incubation only.

This repository is the static corporate/partner site. It does not own portfolio
execution, internal telemetry, partner intake, or Maestro's command harness.

Stop for founder approval before changing public claims, company/legal identity,
canonical domain/contact, analytics or data collection, partner forms, privacy/legal
copy, or the site's static public boundary.

## CI runs locally (no GitHub Actions)

GitHub-hosted Actions are off (founder, 2026-10-29). CI runs on the Mac Studio:

```bash
scripts/ci-local.sh --pr <N> --post-status   # every job on the committed HEAD; posts `local-ci`
scripts/merge-pr.sh <N>                       # merges only if `local-ci` passed on that exact head
```

- The jobs: Gitleaks, Semgrep (rule fixtures, then the rules), `npm ci`,
  typecheck, build, `check:security-config`, and `npm audit --omit=dev --audit-level=high`.
- `scripts/ci-local.sh --full` adds the old weekly scans: OSV over every lockfile
  (dev dependencies included) and the production header smoke test. Run it before
  dependency or header changes. It does not gate merges.
- Commit first. The script refuses a dirty tracked tree.
- Never merge with `gh pr merge` or the GitHub button. Use `scripts/merge-pr.sh`.
- Vercel still builds a preview for every pushed branch and deploys `main`.
  That doesn't use Actions.
- Don't add workflows that run on push, pull_request or schedule.
