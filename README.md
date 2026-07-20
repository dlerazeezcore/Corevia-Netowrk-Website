# Corevia Network Website

Marketing site for **Corevia Network** — business systems, operations, and
technology solutions for modern companies.

The UI is an implementation of **`ui_kits/corevia-website/corevia-v3.html`**
from the [Corevia Network Design System](https://claude.ai/design/p/2b4a8d7c-ba5d-4f37-b4ff-ce34e1ebb5d4)
project on Claude Design.

## Stack

- [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) + TypeScript
- Plain CSS with design tokens (custom properties) — **no Tailwind**. The design
  is built entirely from inline styles + CSS variables, so a utility framework
  would only risk fighting it.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # type-check with tsc
```

## Project structure

```
.
├── public/
│   ├── assets/                     # brand logos (corevia, tulip mark)
│   ├── ui_kits/                    # vendored live-demo embeds
│   │   ├── corevia-website/        #   tulip-embed*.html (iframe entries)
│   │   └── tulip-app/              #   the Tulip Booking app screens
│   └── vendor/bnari/               # vendored Bnari Kodo app + marketing site
├── src/
│   ├── App.tsx                     # renders the V3 site
│   ├── main.tsx                    # app entry
│   ├── index.css                   # imports the design system + page styles
│   └── design/
│       ├── tokens/                 # colors, typography, spacing, effects, base, fonts
│       ├── styles.css              # design-system entry (imports tokens)
│       ├── corevia-v3.css          # V3 page styles
│       ├── components/             # Button, Eyebrow, Badge, IconTile, Field, Card
│       ├── icons.jsx               # inline SVG icon set
│       ├── cv2.jsx                 # NetworkCanvas, CountUp, BrowserFrame, hooks
│       └── CoreviaSiteV3.jsx       # the page itself
├── index.html                      # HTML shell + SEO meta
└── vite.config.ts
```

The `@` alias resolves to `src/` (e.g. `import Foo from '@/design/Foo'`).

### About the live embeds

The three Tulip cards and the Bnari Kodo panel are **real, interactive
products** rendered in iframes, exactly as the design intends. Those embedded
apps are self-contained static bundles that compile their own JSX in the browser
via Babel standalone, loaded from unpkg — so **they require network access at
runtime**. They are vendored under `public/` with their original folder layout
so their relative paths keep resolving.

Everything the main site references is resolved through
`import.meta.env.BASE_URL`, so the embeds keep working if `base` changes.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which builds
the site and publishes `dist/` to GitHub Pages (with a `404.html` SPA fallback).

> **Note:** `base` in `vite.config.ts` is `'/'`, which is correct for a custom
> domain. If you deploy to a project Pages URL
> (`https://<user>.github.io/Corevia-Netowrk-Website/`), set `base` to
> `'/Corevia-Netowrk-Website/'` so assets and embeds resolve.
