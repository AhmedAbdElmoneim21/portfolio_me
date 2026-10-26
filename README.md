# Ahmed Abd Elmoneim portfolio

Static HTML, CSS, and JavaScript portfolio served by GitHub Pages. No build step or API keys. Norsal is self-hosted from the owner-provided font files. GSAP and ScrollTrigger 3.13.0 load from jsDelivr; content stays visible if these scripts are unavailable.

## Preview

Run `python3 -m http.server 8000` from the repository root and open http://localhost:8000.

## Content

- `index.html`: home and selected work
- `projects.html`: filterable project archive
- `about.html`: current experience, background, and tools
- `projects/`: individual project stories
- `assets/projects/`: web-optimised covers exported from the owner-provided portfolio PDF
- `CSS/style.css`: shared visual tokens, layout, responsive and reduced-motion styles
- `js/main.js`: progressive enhancement for filters and cinematic whole-layer reveals, scroll composition, and pointer interactions

The accent is set with `--accent` in CSS. Research findings, analytics usage, participant counts, and performance metrics should only be added after the owner provides real evidence. The stories describe interface scope and design rationale. Tajwal also includes owner-supplied annual registered-customer and SIM-sales totals, clearly separated from design impact; reporting years are unspecified. Historical cover status/date labels are part of the original artwork.

Contact links and CV have been updated. No tracking scripts are installed.

## Appearance and design explorer

The header theme toggle follows system preference on first visit and remembers an explicit choice. The home design explorer compares Simlo's earlier cover and v2.0 with an eased CSS mask; buttons can show either complete cover. A native dialog provides a project quick view with keyboard focus handling. The owner-provided portrait is served as an optimised WebP.
