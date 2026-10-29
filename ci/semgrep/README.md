# Semgrep CE policy

The `semgrep` job in `scripts/ci-local.sh` runs Semgrep Community Edition 1.136.0 from the Studio's `PATH`. It uses no Semgrep account, token, cloud rules, source upload, SARIF, or GitHub Advanced Security permission.

Only reviewed rules vendored in `.semgrep.yml` block. Validation proves every rule
against adversarial unsafe fixtures, including direct and aliased `window` and
`globalThis` privacy APIs, and proves representative safe code remains clean.

Run locally with Semgrep 1.136.0 on `PATH`:

```bash
ci/semgrep/validate-rules.sh
semgrep scan --strict --config .semgrep.yml --error --metrics=off --disable-version-check --exclude ci/semgrep/fixtures
```
