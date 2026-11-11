# Product Requirements Document (PRD) - Rick and Morty Dex

## 1. Overview & Purpose
Rick and Morty Dex is a responsive master-detail web application for exploring characters from the Rick and Morty multiverse. The application allows fans and researchers to search, filter, inspect detailed character profiles, save favorites locally, and view statistical distributions of the multiverse.

## 2. Target Audience
Fans of the animated show, researchers of sci-fi dimensions, and users seeking a fast, intuitive character catalog.

## 3. Pages & Routing
- **Home / Master List (`/`)**: Displays a searchable and filterable list of characters.
- **Character Details (`/characters/:id`)**: Comprehensive view of a specific character (episodes, origin, location, status).
- **Favorites (`/favorites`)**: User-saved characters persisted in `localStorage`.
- **Statistics (`/stats`)**: Multiverse metrics (status breakdown, species ratio, top episode appearances).

## 4. User Stories & Acceptance Criteria
- **When I** open the home page, **I see** a loading indicator, followed by a responsive grid of 20 characters with their images, names, and status badges.
- **When I** type a name in the search bar or select a status filter, **I see** the character grid update in real-time.
- **When I** click on a character card, **I am navigated** to `/characters/:id` displaying detailed information and an option to toggle favorites.
- **When I** add a character to favorites, **I can navigate** to `/favorites` and see the saved character even after refreshing the browser.
- **When I** visit `/stats`, **I see** analytical cards showing status distribution (Alive/Dead/unknown) and episode statistics.