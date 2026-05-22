# Rancang Bangun Engineering Toolkit Hub v1.0

## Purpose
Phase 1 hub application for accessing Osman's current engineering tools through one branded entry point. The hub does not modify the existing calculator logic or their current repositories.

## Linked tools
- Process Engineering → Pressure Drop Calculator  
  https://osaftari-source.github.io/Pressure-Drop-Calculator/
- Piping Engineering → Piping MTO Generator  
  https://osaftari-source.github.io/Piping-MTO-Generator/
- Piping Engineering → Pipe Support Span  
  https://osaftari-source.github.io/Pipe-Support-Span/

## Recommended GitHub repository
Create a new public repository named:

`Rancang-Bangun-Engineering-Toolkit`

Expected GitHub Pages URL:

`https://osaftari-source.github.io/Rancang-Bangun-Engineering-Toolkit/`

## Upload instructions
1. Create the new repository.
2. Extract this ZIP.
3. Upload all files and folders *inside* the extracted folder to the repository root.
4. In GitHub repository settings, open **Pages**.
5. Set deployment from branch: `main` / `(root)`.
6. Open the GitHub Pages URL after deployment.

Do not upload the ZIP file itself into the repository.

## Phase 1 design decisions
- Hub is an independent PWA.
- Existing tools remain standalone apps and open from tool cards.
- Existing calculator repositories are not altered.
- Hub uses a safe update mechanism: update check → update notification → activate waiting service worker → reload. It does not forcibly clear caches.
- Versioned local CSS/JS asset URLs are used to reduce mixed-version cache risk.

## Future phases
- Trial navigation and discipline grouping.
- Add consistent **Back to Rancang Bangun Engineering Toolkit** navigation in each module.
- Standardize headers and update behavior for all modules.
- Consider migrating modules into the Toolkit repository after stability is confirmed.
