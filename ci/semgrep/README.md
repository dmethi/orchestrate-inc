# Semgrep CE policy

The pull-request gate runs Semgrep Community Edition in the official 1.136.0 image pinned to OCI digest `sha256:cda1b566fafbf6010a02a3ea1d265b1c8eba4380e489a13891a102243d81ca6f`. It uses no Semgrep account, token, cloud rules, source upload, SARIF, or GitHub Advanced Security permission.

Only reviewed rules vendored in `.semgrep.yml` block. Validation proves every rule
against adversarial unsafe fixtures, including direct and aliased `window` and
`globalThis` privacy APIs, and proves representative safe code remains clean.

Run locally with Semgrep 1.136.0 on `PATH`:

```bash
ci/semgrep/validate-rules.sh
semgrep scan --strict --config .semgrep.yml --error --metrics=off --disable-version-check --exclude ci/semgrep/fixtures
```
