# Rick and Morty Dex

A responsive master-detail web app for exploring characters from the Rick and Morty multiverse. Browse a grid of characters, search and filter them, open a detailed profile for any character, save your favorites, and see statistics about the multiverse.

## Features

- **Master-detail view.** The home page (`/`) shows a responsive grid of character cards with image, name, species and a status badge. Clicking a card opens its detail page (`/characters/:id`) with origin, current location, episode count and status.
- **Search and filter.** A search bar filters characters by name, and a dropdown filters by status (Alive / Dead / unknown). Both filters apply together and update the grid as you type.
- **Favorites with `localStorage`.** Any character can be favorited from its card or detail page. Favorites are saved in `localStorage`, so they are still there after a browser reload, and they stay in sync across open tabs. All saved characters are listed on `/favorites`.
- **Multiverse statistics.** The `/stats` page shows the status distribution (Alive / Dead / unknown), the most common species, and the character who appears in the most episodes.
- **Loading and error states.** Every page that fetches data shows a spinner while loading and an error message with a retry button if the request fails. Unknown routes show a 404 page.
- **Responsive layout.** The layout adapts to narrow mobile screens without horizontal scrolling.

## Tech stack

| Tool | Purpose |
| --- | --- |
| [React](https://react.dev/) 19 | UI components and hooks |
| [TypeScript](https://www.typescriptlang.org/) | Static typing (strict, no `any`) |
| [Vite](https://vite.dev/) | Dev server and production build |
| [React Router](https://reactrouter.com/) 7 | Client-side routing |
| [Vitest](https://vitest.dev/) + Vitest UI | Unit tests |
| ESLint | Linting |

## API

The data comes from the free, public [Rick and Morty API](https://rickandmortyapi.com/). No API key is needed. The app uses these endpoints:

| Endpoint | Used for |
| --- | --- |
| `GET /api/character` | First page of characters (home and stats pages) |
| `GET /api/character/:id` | A single character (detail page) |
| `GET /api/character/1,2,3` | Several characters at once (favorites page) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite; includes npm)

### 1. Install dependencies

```bash
git clone https://github.com/bar-sharabani/rick-morty-dex.git
cd rick-morty-dex
npm install
```

### 2. Run the app in development mode

```bash
npm run dev
```

Then open the URL Vite prints in the terminal (usually http://localhost:5173).

### 3. Run the unit tests

```bash
npm test
```

This runs all Vitest tests once in the terminal.

### 4. Open the Vitest UI

```bash
npm run test:ui
```

This starts Vitest in watch mode and opens an interactive test dashboard in the browser.

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run build` | Type-checks the project (`tsc -b`) and creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint on the whole project |

## Project structure

```
src/
├── api/
│   └── characters.ts          # fetch functions for the Rick and Morty API
├── components/                # reusable UI components
│   ├── CharacterCard.tsx
│   ├── ErrorMessage.tsx
│   ├── FavoriteButton.tsx
│   ├── LoadingSpinner.tsx
│   ├── NavBar.tsx
│   ├── SearchBar.tsx
│   └── StatusBadge.tsx
├── hooks/                     # data and state hooks
│   ├── useCharacter.ts        # one character by ID
│   ├── useCharacters.ts       # character list
│   ├── useCharactersByIds.ts  # several characters by ID
│   └── useFavorites.ts        # favorites persisted in localStorage
├── pages/                     # one component per route
│   ├── HomePage.tsx           # /
│   ├── CharacterDetailPage.tsx# /characters/:id
│   ├── FavoritesPage.tsx      # /favorites
│   ├── StatsPage.tsx          # /stats
│   └── NotFoundPage.tsx       # any other path
├── types/
│   └── character.ts           # Character, LocationInfo, ApiResponse types
├── utils/                     # pure functions + their tests
│   ├── filterCharacters.ts
│   ├── filterCharacters.test.ts
│   ├── stats.ts
│   ├── stats.test.ts
│   ├── errorMessage.ts
│   └── testFactories.ts       # test data helpers
├── App.tsx                    # routes and layout
└── main.tsx                   # entry point (BrowserRouter)
```

## Architecture

- **Routing.** `main.tsx` wraps the app in a `BrowserRouter`, and `App.tsx` defines the routes plus a shared `NavBar`. Navigation happens on the client without page reloads.
- **Data fetching.** All network calls live in `src/api/characters.ts`. The hooks in `src/hooks/` call them and expose a typed state (`loading` / `error` / `success`) to the pages. Requests are cancelled with `AbortController` when a component unmounts.
- **Favorites.** `useFavorites` keeps the list of favorite IDs in `localStorage` and shares it between all components through `useSyncExternalStore`, so every favorite button and the favorites page update together.
- **Business logic.** Filtering and statistics are pure functions in `src/utils/` that do not depend on React. This keeps the pages simple and lets the logic be unit-tested directly.
- **Type safety.** Every API response, component prop and hook result has an explicit TypeScript type or interface. The project does not use `any`.

## Testing

There are 21 unit tests in `src/utils/*.test.ts`. They cover:

- **Filtering** (`filterCharacters`): search by name (case-insensitive), filter by status, combining both filters, and empty results.
- **Statistics** (`stats`): status distribution, top species ranking, the most-featured character, and percentage calculation.
