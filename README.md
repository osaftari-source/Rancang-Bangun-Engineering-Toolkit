# Rancang Bangun Engineering Toolkit Hub v1.2.

## Scope of this update
Hub v1.2 updates the Toolkit Hub only. It does not modify the three existing engineering tools.

### Changes from v1.1
- Home **Tools** page is simplified by removing the lower About and Application Update cards.
- Navigation now includes **Tools**, **Propose a Tool**, and **About & Status**.
- New `propose.html` page provides the proposal workflow and a downloadable example-filled Word form.
- The example proposal form uses the existing **Pipe Support Span Calculator** as the reference case.
- **Application Update** has been moved to the **About & Status** page.
- About page includes the candidate development roadmap.
- Service worker/cache version updated to v1.2.0.

## Active linked tools
- Pressure Drop Calculator: https://osaftari-source.github.io/Pressure-Drop-Calculator/
- Piping MTO Generator: https://osaftari-source.github.io/Piping-MTO-Generator/
- Pipe Support Span Calculator: https://osaftari-source.github.io/Pipe-Support-Span/

## Upload instructions
1. Extract this ZIP.
2. Upload/replace all files and folders in the repository root.
3. Confirm these new items are uploaded:
   - `propose.html`
   - `assets/js/propose.js`
   - `downloads/Form_Usulan_Pengembangan_Aplikasi_Engineering_Toolkit_Contoh_Pipe_Support_Span.docx`
4. After GitHub Pages deployment, open the Toolkit and use **About & Status → Check for updates** if a previously installed PWA still shows an older Hub version.

Do not upload the ZIP file itself into the repository.
