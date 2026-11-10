# ASI-408 — Development of the RoboMaster Heavy Robot

NUS CDE4301 Innovation & Design Capstone (AY2026/27). This repository contains the static project website and interim report, based on the existing report rather than newly invented testing results.

## Project code and repository rename

The repository should be named **ASI-408** in accordance with the EDIC tutorial. If it is still named `CDE4301`, the repository owner should open **Settings → General → Repository name**, type `ASI-408`, then select **Rename**. The public site should then use `https://mikidokido.github.io/ASI-408/` after GitHub Pages updates. The site itself uses relative links so it works before and after the rename.

## Video evidence

Five video links cited in the original interim presentation are embedded in the relevant sections: competition footage (slide 12), two step-climbing examples (slide 28), and two overturning/recovery demonstrations (slide 29). Video clips are hosted by Bilibili, not by this repository. Click a screenshot to load the third-party player; if playback is unavailable, follow the Bilibili source link directly below each player.

## Structure

- `index.html`: landing page and project introduction
- `interim-report/index.html`: competition context, requirements and historical projectile use
- `interim-report/design.html`: subsystem selection and embedded step/recovery video examples
- `interim-report/progress.html`: Semester 1 design and preliminary analyses
- `interim-report/appendices.html`: references, appendix calculations and presentation video sources
- `assets/report-figures/`: illustrations extracted from the report
- `assets/video-posters/`: five still frames from the supplied presentation PDF
- `styles.css`, `site.js`: responsive styling and lazy-load video playback

Enable GitHub Pages using **Settings → Pages → Source: GitHub Actions** so `.github/workflows/pages.yml` can publish from `main`. No build tools are required. Videos require an internet connection and are subject to Bilibili's availability and embedding restrictions.
