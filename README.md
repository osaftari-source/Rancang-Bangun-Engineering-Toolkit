# Rancang Bangun Engineering Toolkit Hub v1.1

## Version title
**Responsive Layout & About/Development Status Page**

## Purpose
Phase 1 hub application for accessing current engineering tools through one branded entry point. The Hub is intended to help engineers perform quick preliminary calculations and early evaluations more efficiently.

The Hub does not replace approved engineering calculations, applicable codes, project specifications, vendor documents, or professional engineering review.

## New in v1.1
- Responsive desktop layout: the Hub now expands into a dashboard-style grid on laptop/PC screens.
- A concise developer message on the Tools home page.
- A dedicated **About & Status** page showing purpose, current phase, available tools, and roadmap.
- Navigation between **Tools** and **About & Status** pages.
- Updated cache/app-shell configuration for the new page and assets.
- Existing calculator applications remain separate and unchanged.

## Linked tools
- Process Engineering → Pressure Drop Calculator  
  https://osaftari-source.github.io/Pressure-Drop-Calculator/
- Piping Engineering → Piping MTO Generator  
  https://osaftari-source.github.io/Piping-MTO-Generator/
- Piping Engineering → Pipe Support Span Calculator  
  https://osaftari-source.github.io/Pipe-Support-Span/

## Current development status
**Phase 1 — Toolkit Hub Trial**

Current scope:
- Centralized access to available engineering tools.
- Discipline-based navigation.
- Installable Toolkit Hub for mobile access.
- Existing tools continue as standalone apps during trial.

## Recommended GitHub repository
Create a new public repository named:

`Rancang-Bangun-Engineering-Toolkit`

Expected GitHub Pages URL:

`https://osaftari-source.github.io/Rancang-Bangun-Engineering-Toolkit/`

## Upload instructions
1. Create the new repository, or open the existing Hub repository if v1.0 was already uploaded.
2. Extract this ZIP.
3. Upload all files and folders *inside* the extracted folder to the repository root.
4. If replacing v1.0, ensure the new `about.html` and `assets/js/about.js` files are also uploaded.
5. In repository settings, open **Pages** and publish from branch `main` / `(root)`.
6. Open the GitHub Pages URL after deployment.

Do not upload the ZIP file itself into the repository.

## Technical note
The Hub is a separate PWA. Selecting a module currently opens the existing standalone tool link in a browser view/new tab. Moving all tools into one installed application scope will be evaluated in a later phase, after the hub and update mechanisms have been trialed.
