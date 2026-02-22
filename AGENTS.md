# AGENTS.md — simple-web-turing-machine

## Project Overview
A web-based Turing Machine simulator built with React 18 and Vite. Users enter an input string, define initial/final states, and provide transition instructions. The app visually animates the tape, head position, and state transitions step-by-step.

## Key Files

| Path | Purpose |
|---|---|
| `index.html` | Vite entry HTML (root level, loads `/src/index.jsx`) |
| `vite.config.js` | Vite + React plugin config, GitHub Pages base path, Vitest config |
| `src/index.jsx` | React 18 `createRoot` entry point |
| `src/App.jsx` | Root component — renders header and `<Form />` |
| `src/Form.jsx` | **Core logic** — form inputs, instruction parsing, simulation loop (`setInterval`), state management (class component) |
| `src/Tape.jsx` | Stateless component rendering the tape as a row of `<div>` blocks with header indicator |
| `src/static/sass/index.scss` | All styles (SCSS, compiled inline by Vite) |
| `src/App.test.jsx` | Basic render test (Vitest + Testing Library) |
| `.github/workflows/deploy.yml` | GitHub Actions: test → build → deploy to GitHub Pages on push to `master` |

## Pipeline / Architecture

1. **Styling**: SCSS in `src/static/sass/` → compiled by Vite (dart-sass, modern-compiler API) → imported in `App.jsx`.
2. **Runtime**: `index.jsx` → `<App>` → `<Form>` (manages all state) → `<Tape>` (display only).
3. **Simulation flow** (in `Form.jsx`):
   - User fills input, states, and instruction textarea → clicks SIMULATE.
   - Instructions parsed synchronously (split newlines, strip parens/spaces, split commas).
   - Tape initialized with blank cells; input values spliced in.
   - `setInterval` at 1000ms: matches `(state, read)` against rules, applies write/move, updates React state.
   - Halts on final state (alert), halt direction `|`, or no matching rule (error alert).
4. **Deployment**: Push to `master` → GitHub Actions → build → deploy to GitHub Pages.

## Tech Stack

- **React 18** (class components, `createRoot` API)
- **Vite 6** for dev server, build, and SCSS compilation
- **Vitest** + **@testing-library/react** for testing
- **dart-sass** (modern-compiler API)
- **pnpm** for package management
- **GitHub Actions** + **GitHub Pages** for CI/CD and hosting

## Conventions

- Component files are PascalCase `.jsx` (`Form.jsx`, `Tape.jsx`, `App.jsx`)
- Single flat `src/` directory — no nested component folders
- State lives entirely in `Form` component (no external state management)
- CSS classes use BEM-ish naming (`.main-form_input-group`, `.tm-tape-block`)
- Instruction format: `currentState, currentRead, nextState, currentWrite, direction`

## How to Run

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Run tests
pnpm test

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Deployment

Automatic via GitHub Actions on push to `master`. Or manually:

```bash
pnpm deploy
```

Live at: https://medeirosvictor.github.io/simple-web-turing-machine/
