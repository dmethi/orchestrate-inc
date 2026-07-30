# Orchestrate Inc.

Landing page for Orchestrate Inc.—an AI-native holding company that develops, launches, and scales software products through human judgment, agent systems, and disciplined portfolio allocation.

**Entity:** Delaware C-Corp.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run check:security-config
npm run preview
```

Output is in `dist/`. Deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).
The production deployment currently uses Vercel; `vercel.json` is the source of truth
for response security headers. Reproduce that header policy explicitly before moving
the site to a different static host.

## Security checks

Pull requests run the build, typecheck, production dependency audit, Gitleaks,
Semgrep, workflow hygiene checks, and CodeQL. Dependabot and a weekly OSV scan cover
the complete lockfile, including development tooling. The scheduled workflow also runs
`npm run check:deployed-headers` against the existing production deployment. The site
uses system font stacks and does not ship font binaries or request a font service.

## Planning and product context

Studio Linear is the only active build queue. Read `docs/AGENTS.md` and the module
cards for current site decisions. `docs/PLAN.md` is historical design and copy
provenance, not an execution checklist.

## Contact

The current public contact is `inquiries@orchestrateholdings.com`. Changing the
company name, canonical domain, or contact requires founder approval.
