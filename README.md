# YESEN Technologies — Website

Corporate website for YESEN Technologies: solar, energy storage, e-marine and
clean water engineering.

**Live:** https://yesen.website

## Stack

- React 19 + TypeScript
- TanStack Start / TanStack Router (SSR)
- Vite 7
- Tailwind CSS v4

## Development

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev
```

The dev server runs on http://localhost:8080.

## Build

```sh
npm run build
```

Production output is emitted to `dist/`.

## Vercel

Import the connected repository directly into Vercel; no ZIP is needed.
`vercel.json` builds with Nitro's Vercel target and automatically includes all
active original-quality video and image media. See [Vercel setup](README-VERCEL.md).

## Project layout

```
src/
  routes/       file-based routes (index, about, faq)
  components/   UI and section components
  hooks/        shared React hooks
  lib/          utilities (scroll scheduling, performance tiers)
  assets/       images referenced via ES module imports
  styles.css    design tokens + Tailwind entry
public/         static files (favicon, robots.txt)
```

## License

Proprietary — © YESEN Technologies. All rights reserved.
