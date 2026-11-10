# CDE4301 — RoboMaster Heavy Robot interim documentation

This is the website package for **ASI-408: Development of the RoboMaster Heavy Robot** (AY2026/27). It follows the earlier two-level site structure (`index.html` and `interim-report/`) and the EDIC GitHub tutorial's recommendations on multi-page documentation, contents/navigation, figures, tables, and references.

## Files to update

- `index.html` — project overview (new responsive hero and requirement cards)
- `styles.css` and `site.js` — shared styling and navigation
- `interim-report/index.html` — acknowledgements, introduction, competition context and robot specs
- `interim-report/design.html` — design thinking and decision matrices
- `interim-report/progress.html` — Semester 1 engineering work and future plan
- `interim-report/appendices.html` — references and detailed appendices
- `assets/report-figures/` — images extracted from the report document, preserving the embedded figures

## Publishing to existing repository

Target repository previously used for the project: https://github.com/Mikidokido/CDE4301

1. Download and unzip the package.
2. **Keep any existing repository-specific files** you want to preserve. Copy these files and directories into the repository root; overwrite matching website files.
3. In VS Code, preview locally with the Live Server extension, as described in the EDIC tutorial.
4. Check that GitHub Pages is enabled in Settings → Pages, **Deploy from a branch**, `main`, `/(root)`.
5. Commit and push in the repository directory:

   ```bash
   git add .
   git commit -m "Update CDE4301 interim report website"
   git push origin main
   ```

GitHub Pages should then serve the site from the repository's project URL. This package is **not automatically pushed** to GitHub.

## Content status

- Generated from `CDE4301_Interim_Report_Revised.docx`, including report sections, figures, tables, references and appendices.
- Original explanatory text and numerical assumptions have been preserved. No unrecorded physical tests were fabricated.
- The chassis geometry, material choices, docking evaluation, and FEA are described as preliminary where they have not been physically validated.
- Source citations remain in IEEE style as supplied in the report.

## EDIC resources

- Template: https://edic-nus.github.io/template/
- Tutorial: https://edic-nus.github.io/tutorial/ (supplied as PDF)

The site uses plain HTML, CSS and JavaScript. It does not require a build step, server, or third-party JS framework.

## GitHub Pages

Deploy from the `main` branch root (Settings → Pages). All report figures are stored as compressed `.webp` files under `assets/report-figures/`; no build step is required.
