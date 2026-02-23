# NEXA — AI Automation Society

Official website for **NEXA**, an AI Automation Society community. Built as a single-page, fully responsive landing site.

## Overview

NEXA is a community-driven organization focused on AI automation. This site serves as the public-facing landing page — introducing the community, showcasing what members build, and providing a path to join.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (single `index.html`) |
| Styling | Inline CSS + [Tailwind CSS CDN](https://cdn.tailwindcss.com) |
| Typography | [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) via Google Fonts |
| Animations | Vanilla JS + [simplex-noise](https://www.npmjs.com/package/simplex-noise) |
| Images | Brand assets from `brand_assets/` |

## Project Structure

```
NEXA--test-website/
├── index.html          # Full site — all styles and scripts inline
├── brand_assets/
│   ├── NEXA (3).png    # NEXA logo
│   └── BRAND (1).png   # Brand identity asset
├── serve.mjs           # Local dev server (serves on http://localhost:3000)
├── screenshot.mjs      # Puppeteer screenshot utility for dev workflow
└── README.md
```

## Local Development

**Serve locally:**
```bash
node serve.mjs
```
Opens the site at `http://localhost:3000`.

**Take a screenshot:**
```bash
node screenshot.mjs http://localhost:3000
```
Saves a screenshot to `./temporary screenshots/screenshot-N.png`.

## Deployment

The site is a static single-page app — no build step required.

**GitHub Pages:**
1. Go to **Settings → Pages** in this repository
2. Set source to `main` branch, `/ (root)`
3. The site will be live at `https://<your-username>.github.io/NEXA--test-website/`

**Custom domain:**
Add a `CNAME` file to the repo root with your domain (e.g. `nexacommunity.com`), then configure your DNS to point to GitHub Pages.

## Brand

- **Primary:** `#0B90FF` (NEXA Blue)
- **Accent:** `#FF6B00` (Orange)
- **Background:** `#04070E`
- **Font:** Roboto Mono

---

© NEXA AI Automation Society
