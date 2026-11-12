# יומן פרומפטים

## 2026-11-11

**19:48 · claude**

> test

**20:16 · claude**

> Please read PRD.md and tasks.md, and implement Task 1 in full.

**20:28 · claude**

> Please read PRD.md and tasks.md, and implement Task 2 in full. Create reusable LoadingSpinner and ErrorMessage components under src/components/ to handle the loading and error states.

**20:34 · claude**

> Please read PRD.md and tasks.md, and implement Task 3 in full. Create a separate CharacterCard component in src/components/CharacterCard.tsx with explicit TypeScript props (no any). Wrap each card in a Link to /characters/:id, and style the grid to be clean and responsive.

**21:22 · claude**

> <pasted_content id="adc6">
> Please read PRD.md and tasks.md, and implement Task 4 in full.
> 
> 1. Extract the filtering logic into a pure utility function in src/utils/filterCharacters.ts that filters characters by both search query and status simultaneously.
> 2. Create a separate SearchBar component in src/components/SearchBar.tsx with inputs for text search and status dropdown.
> 3. Connect it to HomePage so characters update instantly as the user types or changes status. Ensure no 'any' types are used.
> </pasted_content id="adc6">

**21:30 · claude**

> <pasted_content id="12f4">
> Please read PRD.md and tasks.md, and implement Task 5 in full.
> 
> 1. In src/pages/CharacterDetailPage.tsx, use useParams to get the character ID and fetch character details from the Rick and Morty API.
> 2. Reuse LoadingSpinner and ErrorMessage for loading and error states.
> 3. Display character image, name, status badge, species, gender, origin name, current location name, and episode count (episode.length).
> 4. Include a "Back to Characters" link/button to return to the home page. Ensure strict TypeScript types (no 'any').
> </pasted_content id="12f4">

**21:37 · claude**

> <pasted_content id="34ba">
> Please read PRD.md and tasks.md, and implement Task 6 in full.
> 
> 1. Create a useFavorites hook in src/hooks/useFavorites.ts to manage favorited character IDs with persistence in localStorage.
> 2. Add an interactive favorite toggle button (star icon/button) to both CharacterDetailPage and CharacterCard.
> 3. Implement src/pages/FavoritesPage.tsx displaying the grid of favorited characters, and an empty state ("No favorites saved yet") with a link back to characters if empty.
> 4. Ensure full TypeScript types, no 'any', and responsive design.
> </pasted_content id="34ba">

**21:45 · claude**

> <pasted_content id="736d">
> Please read PRD.md and tasks.md, and implement Task 7 in full.
> 
> 1. In src/utils/stats.ts, implement pure calculation functions for:
>    * calculateStatusDistribution: count of Alive, Dead, and unknown characters.
>    * getTopSpecies: ranking of species distribution.
>    * getMostFeaturedCharacter: character with the highest episode count.
> 2. In src/pages/StatsPage.tsx, reuse useCharacters, LoadingSpinner, and ErrorMessage to fetch characters and display these metrics in attractive statistical summary cards.
> 3. Ensure responsive layout, clean CSS, and strict typing without any 'any'.
> </pasted_content id="736d">

**21:52 · claude**

> <pasted_content id="8733">
> Please read PRD.md and tasks.md, and implement Task 8 in full.
> 
> 1. Install vitest and @vitest/ui as devDependencies.
> 2. Add "test": "vitest run" and "test:ui": "vitest --ui" scripts to package.json. Configure vite.config.ts if needed.
> 3. Write at least 6 meaningful unit tests across src/utils/filterCharacters.test.ts and src/utils/stats.test.ts covering:
>    * Filtering by name (case-insensitive).
>    * Filtering by status.
>    * Combined name and status filtering.
>    * calculateStatusDistribution handling various cases.
>    * getTopSpecies calculation and percentage ranking.
>    * getMostFeaturedCharacter finding the max episodes character and handling empty lists.
> 4. Ensure all tests pass with npm test, zero TypeScript errors, and no 'any' types.
> </pasted_content id="8733">

**22:01 · claude**

> <pasted_content id="d3e4">
> Please read PRD.md and tasks.md, and implement Task 9 in full.
> 
> 1. Review all CSS across the app to ensure clean, consistent design and flawless mobile responsiveness on narrow screens (320px - 480px). Ensure the NavBar collapses/wraps cleanly on mobile.
> 2. Verify that our custom components (NavBar, LoadingSpinner, ErrorMessage, CharacterCard, SearchBar, StatusBadge, FavoriteButton) are properly modularized in separate files.
> 3. Ensure no horizontal overflow anywhere in the application.
> </pasted_content id="d3e4">
