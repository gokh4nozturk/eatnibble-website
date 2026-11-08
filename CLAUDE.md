# eatnibble-website

Static marketing site for the eatnibble iOS app, served at `https://eatnibble.app`. Plain HTML + one shared stylesheet — no build step, no framework, no third-party scripts.

## ⚠️ `ai.html` must stay

`https://eatnibble.app/ai.html` is given to AI tools and their app directories (ChatGPT, Claude, …) as eatnibble's reference/documentation URL for the MCP connection. It is important and must never break:

- Never delete, rename or move it, and never turn it into a redirect — keep the exact path `ai.html`.
- It must always explain, as readable page text (not only in images or behind JavaScript): what the connection does, what you need (signed-in app + the server URL `https://eatnibble-backend.vercel.app/mcp`), setup steps for each assistant, approving the 6-digit code in the app, what the assistant can and can't do (`log_meal`, `update_meal` / `delete_meal` — only meals from the last 7 days, when the user asks; added or corrected meals wait for review in the app —, `get_today_summary`, `get_recent_meals`), how data is handled, how to disconnect, and troubleshooting.
- A redesign may change its look and layout, but not drop any of the above. The assistant picker is progressive enhancement: all five guides stay in the HTML (JS only hides unselected ones), and `ai.html#<assistant>` (`chatgpt`, `claude`, `gemini`, `grok`, `cursor`) opens that guide — the home page logos link there.
- Keep the per-assistant steps in sync with the iOS app's in-app guide (`ai_guide_<id>_<n>` strings in `eatnibble-ios`, `AIAssistantGuideView`).

## Structure

- `index.html` — home page (hero, input methods, portions, AI assistants section `#ai`, Apple Health, history, weekly coach, everywhere (Watch, widgets, Lock Screen camera, Siri), more features, privacy, CTA). When the app gains a user-facing feature, add it here and check `privacy.html` / `support.html` for claims it makes stale
- `ai.html` — AI assistant connection page (see above)
- `privacy.html`, `terms.html`, `support.html` — legal/support pages (`.doc` layout)
- `share.html` + `js/share.js` — shared plan / report page. `vercel.json` rewrites `/p/<id>` (eating plan) and `/r/<id>` (meal report) to it; the script reads `GET https://eatnibble-backend.vercel.app/public/shares/<id>` and draws it with DOM text nodes only (the sharer's name, note, recipe and meal names are user input — never `innerHTML`). Plans: macro ring, calorie cycling week, fasting window, recipes (per serving, ingredients in `<details>`), pinned meals, then the import panel (App Store badge; on iOS also "Open in eatnibble" → `eatnibble://p/<id>`, for in-app browsers where universal links don't fire). Reports: daily average, calories-by-day bars, day-by-day meals, Print. Loading skeleton, not-found / expired and error states. Its own small string table in en / tr / de / es / fr picked from the browser language (the sharer and the reader usually share a language; this is not a "languages" feature claim). Absolute asset paths (`/css/…`), since it's served under `/p/` and `/r/`. `noindex`; the Open Graph tags are generic (static hosting can't personalize them)
- `.well-known/apple-app-site-association` — universal links: `/p/*` opens the iOS app (team `7746WX9K8X`, `com.eatnibble.eatnibble`), which offers to import the plan; reports stay on the web. Served as `application/json` (`vercel.json` headers). Keep the app's `applinks:eatnibble.app` entitlement in sync
- `css/styles.css` — the only stylesheet, shared by every page; light/dark tokens on `:root`
- `DESIGN.md` — design system (tokens, type, components). Follow it for any UI change
- `favicon.svg`, `icons/`, `site.webmanifest` — icons

## Rules

- Every page shares the same nav (Features · AI assistants · Privacy · Support) and footer; change them on all pages together.
- Never mention supported languages as a feature.
- Don't invent testimonials, ratings, download counts or prices.
- Assistant logos come from the backend (`https://eatnibble-backend.vercel.app/client-icons/<id>.png?v=<ICON_VERSION>`); keep `?v=` equal to the backend's `ICON_VERSION`. No third-party logo files in this repo.
- Check changes at phone, tablet and desktop widths, in light and dark mode, and with the keyboard only.
