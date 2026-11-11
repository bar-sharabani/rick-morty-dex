# Development Tasks - Rick and Morty Dex

- [x] **Task 1: Setup Types & Core Routing**
  - Define TypeScript types (`Character`, `LocationInfo`, `ApiResponse`) in `src/types/character.ts`. Setup `BrowserRouter` with routes (`/`, `/characters/:id`, `/favorites`, `/stats`) and navigation bar.
  - *Done when:* Clicking navigation links changes routes without page reload.

- [x] **Task 2: Character Fetching & State Handling**
  - Fetch character data from Rick and Morty API on home page with loading, error, and success states.
  - *Done when:* Page displays spinner while loading, error message on network failure, or list of character names on success.

- [x] **Task 3: CharacterCard & Grid Component**
  - Build `CharacterCard` component rendering image, name, species, and status badge. Map list with unique `key={character.id}`.
  - *Done when:* Home page displays a clean, responsive grid of characters.

- [x] **Task 4: Search & Filtering Logic**
  - Implement `SearchBar` and status dropdown filter on home page.
  - *Done when:* User can filter characters by name and status simultaneously.

- [x] **Task 5: Character Detail Page**
  - Create detail view utilizing `useParams` to fetch `/characters/:id` and display origin, location, and episode count.
  - *Done when:* Clicking a card navigates to `/characters/:id` and renders full character details.

- [x] **Task 6: Favorites Page & LocalStorage**
  - Implement favorite toggle button and persist favorites in `localStorage`. Build `/favorites` page.
  - *Done when:* Favorited characters appear on `/favorites` and remain after browser reload.

- [ ] **Task 7: Multiverse Statistics Page**
  - Implement pure utility functions for metrics (status counts, species distribution, top character). Display metrics on `/stats`.
  - *Done when:* `/stats` displays calculated summaries from the character data.

- [ ] **Task 8: Unit Testing with Vitest**
  - Install Vitest and Vitest UI. Write at least 5 unit tests for filtering and statistics calculations.
  - *Done when:* `npm test` passes all tests and `npm run test:ui` opens the Vitest dashboard without errors.

- [ ] **Task 9: Responsive CSS & Component Refinement**
  - Refine CSS styling, ensure mobile responsiveness, and confirm at least 4 custom components exist in separate files.
  - *Done when:* App layout adapts cleanly to narrow mobile screens without horizontal scroll.

- [ ] **Task 10: Build Verification & Documentation**
  - Update `README.md` with instructions, verify `npm run build` passes with zero errors and no `any` types.
  - *Done when:* Production build succeeds and README explains run commands and architecture.