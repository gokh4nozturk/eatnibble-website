# eatnibble-website

Static marketing site for the eatnibble iOS app, served at `https://eatnibble.app`. Plain HTML + one shared stylesheet — no build step, no framework, no third-party scripts.

## ⚠️ `ai.html` must stay

`https://eatnibble.app/ai.html` is given to AI tools and their app directories (ChatGPT, Claude, …) as eatnibble's reference/documentation URL for the MCP connection. It is important and must never break:

- Never delete, rename or move it, and never turn it into a redirect — keep the exact path `ai.html`.
- It must always explain, as readable page text (not only in images or behind JavaScript): what the connection does, what you need (signed-in app + the server URL `https://eatnibble-backend.vercel.app/mcp`), setup steps for each assistant, approving the 6-digit code in the app, what the assistant can and can't do (`log_meal`, `get_today_summary`, `get_recent_meals`; never edits/deletes meals), how data is handled, how to disconnect, and troubleshooting.
- A redesign may change its look and layout, but not drop any of the above. The assistant picker is progressive enhancement: all five guides stay in the HTML (JS only hides unselected ones), and `ai.html#<assistant>` (`chatgpt`, `claude`, `gemini`, `grok`, `cursor`) opens that guide — the home page logos link there.
- Keep the per-assistant steps in sync with the iOS app's in-app guide (`ai_guide_<id>_<n>` strings in `eatnibble-ios`, `AIAssistantGuideView`).

## Structure

- `index.html` — home page (hero, input methods, portions, AI assistants section `#ai`, Apple Health, history, privacy, CTA)
- `ai.html` — AI assistant connection page (see above)
- `privacy.html`, `terms.html`, `support.html` — legal/support pages (`.doc` layout)
- `css/styles.css` — the only stylesheet, shared by every page; light/dark tokens on `:root`
- `DESIGN.md` — design system (tokens, type, components). Follow it for any UI change
- `favicon.svg`, `icons/`, `site.webmanifest` — icons

## Rules

- Every page shares the same nav (Features · AI assistants · Privacy · Support) and footer; change them on all pages together.
- Never mention supported languages as a feature.
- Don't invent testimonials, ratings, download counts or prices.
- Assistant logos come from the backend (`https://eatnibble-backend.vercel.app/client-icons/<id>.png?v=<ICON_VERSION>`); keep `?v=` equal to the backend's `ICON_VERSION`. No third-party logo files in this repo.
- Check changes at phone, tablet and desktop widths, in light and dark mode, and with the keyboard only.
