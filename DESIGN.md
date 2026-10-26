# eatnibble.app — design system

The site should feel like the app: calm, native-iOS, one accent color. Every page links `css/styles.css`; these tokens live on `:root` there.

## Direction

- Apple product-page calm: big tight headlines, generous whitespace, few elements per screen.
- One accent: the brand green. No second CTA color.
- Features are explained with UI drawn in HTML/CSS that copies the real app screens (New meal drawer, analysis result, breakdown rows, Home summary / activity / water, History averages + chart, Weight History, Weekly Coach) — the `.m-*` components in `styles.css`, with their own `--m-*` tokens matching iOS grouped lists (light and dark). When the app UI changes, update them from fresh app screenshots. Real screenshots can replace them one-for-one later.
- Icons are inline stroke SVGs (24px grid, 1.8 stroke, round caps) — no emoji, no colored icon tiles. The only third-party images are AI assistant logos, served by the backend at `/client-icons/<id>.png?v=<ICON_VERSION>`.
- Light and dark follow the system (`prefers-color-scheme`).
- Never mention supported languages; they are a given, not a feature.

## Color

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--bg` | `#fbfbfd` | `#000000` | page |
| `--surface` | `#ffffff` | `#141416` | cards, mock screens |
| `--surface-2` | `#f2f2f5` | `#1f1f22` | inset rows, chips |
| `--border` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.09)` | hairlines |
| `--text` | `#1d1d1f` | `#f5f5f7` | primary text |
| `--text-2` | `#6e6e73` | `#a1a1a6` | secondary text |
| `--brand` | `#16a34a` | `#16a34a` | fills: primary button, ring, glasses |
| `--brand-text` | `#15803d` | `#30d158` | green text/links on the page background |
| `--brand-soft` | `rgba(22,163,74,.10)` | `rgba(48,209,88,.14)` | eyebrow pills, highlights |
| `--protein` / `--fat` | `#0a84ff` / `#ff9f0a` | same | macro colors, as in the app (carbs = brand) |
| `--over` | `#ff9f0a` | same | over-goal marks |

## Type

System stack (SF Pro on Apple devices). Headlines 700, letter-spacing −0.035em.

- `h1` `clamp(44px, 7vw, 80px)` / 1.02
- `h2` `clamp(32px, 4.6vw, 52px)` / 1.06
- `h3` 19px / 1.3
- lead 19–21px, body 16px / 1.55, small 13px

## Shape & spacing

- Radius: 12 (chips/rows), 20 (cards), 28 (big panels), 44 (phone frame), 999 (buttons, pills).
- Container 1120px, 24px gutters (20px under 480px).
- Section padding `clamp(80px, 12vw, 140px)` vertical.
- Shadows only on floating mock UI (`--shadow`), never on flat cards.

## Components

- **Buttons:** pill. `.btn-primary` green, `.btn-ghost` hairline, no hand-made App Store buttons.
- **App Store badge:** Apple's official SVGs in `icons/` (`app-store-badge-black.svg` for light, `-white.svg` for dark via `<picture>`), never edited, recolored or redrawn — only scaled (60px tall, min 40px; the button next to it in the hero matches that height) with clear space around it. Re-download from Apple's marketing toolbox if the artwork changes.
- **Eyebrow:** small green pill above a section's `h2`.
- **Feature split:** text column + mock UI column, alternating sides on desktop, stacked on mobile.
- **Motion:** elements with `.reveal` fade/rise once when scrolled into view (JS adds `.js` on `<html>`; without JS everything is visible). All motion is off under `prefers-reduced-motion`.
- **Assistant picker (ai.html):** five equal logo tiles (`role=tablist`, arrow keys, `#<id>` deep link). Every guide is in the HTML; JS only hides the unselected ones, so without JS all guides show stacked.
- Focus: 2px `--brand-text` outline with 3px offset on every interactive element.
