# Verification notes

- All 13 HTML pages have one h1, image alternative text, and valid local link/asset targets.
- JavaScript passes Node syntax checking.
- Home, project listing/filter controls, and Tajwal case page were checked in the browser.
- Norsal is loaded from the owner's local Regular, SemiBold, and Bold font files. Browser computed typography reports Norsal.
- Home was visually checked at 320, 768, 1024, and 1440px, without horizontal document overflow. Tablet social buttons were adjusted to keep their labels together.
- GSAP whole-element reveal replaces all letter splitting. The hero settles by 2.9 seconds and holds through six seconds; an intermediate frame and the completed page were visually inspected.
- Scroll composition includes a pinned case-study heading on desktop, staggered project entrances, and a continuous project-cover strip. Fine-pointer card tilt is disabled on touch devices.
- Motion is scoped to prefers-reduced-motion: no-preference and reverted if that preference changes. HTML remains visible when animation libraries are unavailable.
- Latest project covers come from the three owner-provided PNGs. Tajwal dashboard uses the operations cover from the final page of the portfolio PDF.
- Simlo v2.0 and Tajwal v3.6.2 are labelled as redesigns in development. Existing App Store releases remain linked separately.
- Tajwal annual totals are owner supplied, with unspecified reporting years and no claim that redesign caused the business growth. No fabricated research, participant counts, or analytics-tool experience was added.
- Purple #7040C4 is provisional pending an exact LinkedIn banner colour sample. White/accent contrast is 6.52:1; dark purple/tint is 7.98:1.

## Theme and design explorer update

- Light/dark theme toggle is present on all 13 pages. Initial theme follows the operating system; explicit choice is saved locally. Preference was verified after navigating from home to About.
- Owner-provided beach portrait replaces the earlier portrait on Home and About; the file is resized for web delivery without altering the photo contents.
- Simlo design explorer uses the actual earlier and v2.0 covers. Fine-pointer lens smoothing and whole-image mode buttons were tested; controls provide a pointer-free alternative. Reduced-motion and coarse-pointer users start with a complete image.
- Project quick-view dialog opens, traps focus using the native dialog element, closes with Escape, and restores focus to its opener. Desktop and 320px layouts were inspected.
- Updated home widths 320/768/1024/1440 have no horizontal document overflow. Browser console has no errors or warnings on the tested pages.

## Design explorer removal

- Removed the comparison lens section, quick-view dialog, and their CSS and JavaScript at the owner's request. Home flows directly from the portrait hero into selected projects again.
- Kept the theme toggle and updated portrait.
