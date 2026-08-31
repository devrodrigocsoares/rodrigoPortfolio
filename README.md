# Rodrigo Soares — Portfolio

[🇧🇷 Português](#português) | [🇬🇧 English](#english)

---

## English

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

---

## Português

Um portfólio pessoal pronto para produção construído com React, TypeScript, Vite, Tailwind CSS e Framer Motion, implementado a partir de um protótipo do Figma.

### Executar localmente

```bash
npm install
npm run dev
```

Abra a URL local que o Vite exibir (geralmente `http://localhost:5173`).

Construir para produção com `npm run build` e visualizar com `npm run preview`.

### Estrutura do projeto

```
src/
├── assets/              # ativos estáticos locais usados nos componentes
├── components/
│   ├── ui/              # Button, Badge, SectionTitle, ProjectCard
│   ├── layout/          # Header (navegação), Footer
│   └── sections/        # Hero, About, TechStack, RecentWork, Projects
├── data/                # todo o conteúdo editável fica aqui
├── hooks/               # usePrefersReducedMotion
├── pages/               # Home.tsx compõe as seções
├── types/               # interfaces TypeScript compartilhadas
└── App.tsx / main.tsx / index.css
```

### Alternância de tema (claro / escuro, com transição circular)

O header possui um único botão sol/lua (`src/components/ui/ThemeToggle.tsx`). Clicar nele faz duas coisas ao mesmo tempo:

1. Alterna o tema instantaneamente no `<html>` (`data-theme="light" | "dark"`), oculto atrás de uma sobreposição de tela cheia.
2. A sobreposição (`src/components/ui/ThemeTransitionOverlay.tsx`) é pintada com o fundo do tema *anterior* e começa como um círculo grande o suficiente para cobrir toda a tela, centralizado no botão. Em seguida, encolhe até nada no botão ao longo de ~650ms (`clip-path: circle()`, suavizado, via Framer Motion) — então o novo tema parece "irradiar" do botão em vez de apenas cortar.

Componentes envolvidos:

- **`src/context/ThemeContext.tsx`** — mantém o tema atual, persiste em `localStorage` e calcula o ponto de origem da transição + o raio necessário para cobrir o viewport.
- **`src/hooks/useTheme.ts`** — o hook que os componentes usam para ler o tema e ativar a alternância.
- **`src/index.css`** — os tokens de cor reais por tema (`--c-ink`, `--c-paper`, `--c-surface`, `--c-navy`, `--c-accent`, `--c-muted`, `--c-line`), os dois gradientes de fundo da página (claro: azul suave → branco; escuro: quase preto → carvão, deliberadamente não preto puro), e cópias estáticas desses mesmos gradientes (`.theme-reveal--light` / `.theme-reveal--dark`) usados apenas pela sobreposição.
- Um script inline em `index.html` aplica o tema salvo antes de React montar, então não há flash do tema errado ao carregar.
- Respeita `prefers-reduced-motion`: o tema ainda alterna, mas a animação circular é omitida.

Para ajustar a paleta de qualquer tema, edite o bloco correspondente em `src/index.css` — os componentes já leem desses tokens (`bg-ink`, `text-muted`, `border-line`, `bg-surface`, `bg-navy`, etc.), então não há nada para mudar nos componentes em si. Se você alterar os paradas de gradiente, atualize tanto a regra `body` quanto a classe `.theme-reveal--*` correspondente para que a sobreposição ainda corresponda exatamente.

### O que você provavelmente vai querer personalizar

- **`src/data/projects.ts`** — substitua os 9 projetos de espaço reservado pelos seus reais (título, descrição, tech, links GitHub/demo, caminho da screenshot).
- **`src/data/skills.ts`** — as listas de tecnologias Frontend / Backend / Database / DevOps mostradas na seção "Tecnologias com as quais trabalho" (`components/sections/TechStack.tsx`).
- **`src/data/focusAreas.ts`** — os três cartões "Designer / Desenvolvedor Frontend / Desenvolvedor Backend" e as ferramentas listadas em cada um.
- **`src/data/work.ts`** — os cartões de destaques "Meu trabalho recente" e sua URL do LinkedIn.
- **`src/data/socials.ts`** — links de redes sociais do rodapé.
- **`src/data/experience.ts`** — entradas de experiência/educação (ainda não integrado em uma seção — adicione uma seção `Experience` em `components/sections` se quiser na página).
- **`public/images/`** — substitua os SVGs de espaço reservado (avatar, destaques de trabalho, capas de projetos) com fotos/screenshots reais. Mantenha os mesmos nomes de arquivo ou atualize os caminhos em `src/data/*.ts`.
- **Links de contato** — os botões "Let's talk" e "Start a conversation" atualmente apontam para um link `mailto:` em `Header.tsx` e `Projects.tsx`; aponte-os para seu email real ou um formulário de contato.

### Notas sobre fidelidade ao protótipo

- Layout, ordem das seções, cópia e o cartão de três colunas "Designer / Frontend / Backend" refletem o protótipo diretamente.
- A navegação superior foi implementada como âncoras funcionais na página (About / Work / Projects / Contact) em vez dos links "Blog" / "Recruit" do protótipo, já que eles não correspondiam a destinos reais aqui — troque-os de volta em `src/data/nav.ts` e `Header.tsx` quando tiver um blog ou página de recrutamento para vincular.
- As fotos do protótipo (avatar, cartões de destaques de trabalho, capas de projetos) são espaços reservados visuais — substitua-as em `public/images/`.
- Cores, escala de tipo e tokens de espaçamento estão centralizados em `tailwind.config.js` (`ink`, `accent`, `muted`, `line`) para que toda a paleta possa ser alterada de um único arquivo.

### Acessibilidade e desempenho

- Marcos semânticos (`header`, `main`, `footer`), link de pular para conteúdo, anéis de foco visíveis e elementos reais `<button>`/`<a>` em todo o lugar.
- Respeita `prefers-reduced-motion` (veja `src/index.css` e `usePrefersReducedMotion`).
- As imagens usam `loading="lazy"` abaixo da dobra; espaços reservados SVG mantêm a carga inicial pequena.
