# Tiansu Li Portfolio Website

Personal portfolio site for Tiansu Li, focused on game development, technical design, interactive experiences, and selected commercial or independent projects.

Live site: <https://tiansuupup.github.io>

## Overview

This site is built as a polished portfolio experience rather than a generic profile page. It highlights:

- Personal introduction and background
- Project archive with detail pages
- Skills and experience sections
- Resume download and contact links
- Visual showcases for games, XR work, and interactive experiments

## Tech Stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Project Structure

```text
/
|-- public/                 Static assets, resumes, project images
|-- src/components/         Homepage and UI components
|-- src/content/projects/   Project content entries
|-- src/layouts/            Shared layout
|-- src/pages/              Routes for homepage and project pages
\-- src/styles/             Global styles
```

## Local Development

Run all commands from the project root:

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run dev` starts the local development server
- `npm run build` creates the production build in `dist/`
- `npm run preview` previews the production build locally

## Deployment

This repository is intended for GitHub Pages deployment via the `tiansuupup.github.io` repository.

## Notes

- `PLAN.md` and `CLAUDE.md` are local workflow notes and are intentionally ignored by Git.
- Built output and dependencies such as `dist/`, `.astro/`, and `node_modules/` are also ignored.
