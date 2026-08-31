# Rodrigo Soares — Portfolio

A production-ready personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion, implemented from a Figma prototype.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Build for production with `npm run build`, and preview that build with `npm run preview`.

## Project structure

```
src/
├── assets/              # local static assets used inside components
├── components/
│   ├── ui/              # Button, Badge, SectionTitle, ProjectCard
│   ├── layout/           # Header (nav), Footer
│   └── sections/         # Hero, About, TechStack, RecentWork, Projects
├── data/                 # all editable content lives here
├── hooks/                # usePrefersReducedMotion
├── pages/                # Home.tsx composes the sections
├── types/                # shared TypeScript interfaces
└── App.tsx / main.tsx / index.css
```

## Theme toggle (light / dark, with a circular reveal transition)

The header has a single sun/moon button (`src/components/ui/ThemeToggle.tsx`). Clicking it does two things at once:

1. Flips the theme instantly on `<html>` (`data-theme="light" | "dark"`), hidden behind a full-screen overlay.
2. That overlay (`src/components/ui/ThemeTransitionOverlay.tsx`) is painted with the *outgoing* theme's background and starts as a circle big enough to cover the whole screen, centered on the button. It then shrinks to nothing right at the button over ~650ms (`clip-path: circle()`, eased, via Framer Motion) — so the new theme appears to "spread outward" from the button instead of just cutting over.

Pieces involved:

- **`src/context/ThemeContext.tsx`** — holds the current theme, persists it to `localStorage`, and computes the transition's origin point + the radius needed to cover the viewport from there.
- **`src/hooks/useTheme.ts`** — the hook components use to read the theme / trigger the toggle.
- **`src/index.css`** — the actual color tokens per theme (`--c-ink`, `--c-paper`, `--c-surface`, `--c-navy`, `--c-accent`, `--c-muted`, `--c-line`), the two page-background gradients (light: soft blue → white; dark: near-black → charcoal, deliberately not flat black), and static copies of those same gradients (`.theme-reveal--light` / `.theme-reveal--dark`) used only by the overlay.
- An inline script in `index.html` applies the saved theme before React mounts, so there's no flash of the wrong theme on load.
- Respects `prefers-reduced-motion`: the theme still switches, but the circular animation is skipped.

To adjust either theme's palette, edit the corresponding block in `src/index.css` — components already read from these tokens (`bg-ink`, `text-muted`, `border-line`, `bg-surface`, `bg-navy`, etc.), so there's nothing to change in the components themselves. If you change the gradient stops, update both the `body` rule and the matching `.theme-reveal--*` class so the overlay still matches exactly.

## What you'll likely want to personalize

- **`src/data/projects.ts`** — swap the 9 placeholder projects for your real ones (title, description, tech, GitHub/demo links, screenshot path).
- **`src/data/skills.ts`** — the Frontend / Backend / Database / DevOps technology lists shown in the "Technologies I work with" section (`components/sections/TechStack.tsx`).
- **`src/data/focusAreas.ts`** — the three "Designer / Frontend Developer / Backend Developer" cards and the tools listed under each.
- **`src/data/work.ts`** — the "My Recent Work" highlight cards and your LinkedIn URL.
- **`src/data/socials.ts`** — footer social links.
- **`src/data/experience.ts`** — background/education entries (not yet wired into a section — add an `Experience` section under `components/sections` if you want it on the page).
- **`public/images/`** — replace the placeholder SVGs (avatar, work highlights, project covers) with real photos/screenshots. Keep the same filenames or update the paths in `src/data/*.ts`.
- **Contact links** — the "Let's talk" and "Start a conversation" buttons currently point to a `mailto:` link in `Header.tsx` and `Projects.tsx`; point them at your real email or a contact form.

## Notes on fidelity to the prototype

- Layout, section order, copy, and the three-column "Designer / Frontend / Backend" card all mirror the prototype directly.
- The top navigation was implemented as working in-page anchors (About / Work / Projects / Contact) rather than the prototype's "Blog" / "Recruit" links, since those didn't correspond to real destinations here — swap them back in `src/data/nav.ts` and `Header.tsx` once you have a blog or recruiting page to link to.
- The prototype's photos (avatar, work-highlight cards, project covers) are visual placeholders — replace them under `public/images/`.
- Colors, type scale, and spacing tokens are centralized in `tailwind.config.js` (`ink`, `accent`, `muted`, `line`) so the whole palette can be changed from one file.

## Accessibility & performance

- Semantic landmarks (`header`, `main`, `footer`), skip-to-content link, visible focus rings, and real `<button>`/`<a>` elements throughout.
- Respects `prefers-reduced-motion` (see `src/index.css` and `usePrefersReducedMotion`).
- Images use `loading="lazy"` where below the fold; SVG placeholders keep initial payload tiny.
