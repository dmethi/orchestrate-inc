# Semgrep CE policy

This PR gate runs pinned Semgrep Community Edition locally on the GitHub runner with no account, token, cloud rules, source upload, SARIF, or GitHub Advanced Security permission.

Only vendored `.semgrep.yml` rules block. Every rule has an unsafe fixture. Broad registry rules remain advisory until reviewed.

```bash
ci/semgrep/validate-rules.sh
semgrep scan --config .semgrep.yml --error --metrics=off --disable-version-check --exclude ci/semgrep/fixtures
```
