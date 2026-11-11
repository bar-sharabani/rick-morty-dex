/** Life status of a character as returned by the Rick and Morty API. */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

/** Gender of a character as returned by the Rick and Morty API. */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown'

/** Short reference to a location (used for a character's origin and last known location). */
export interface LocationInfo {
  name: string
  /** Link to the location's own endpoint; empty string when unknown. */
  url: string
}

/** A single character from the `/character` endpoint. */
export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  /** Sub-type or sub-species; often an empty string. */
  type: string
  gender: CharacterGender
  origin: LocationInfo
  location: LocationInfo
  /** URL of the character's 300x300 avatar image. */
  image: string
  /** URLs of the episodes the character appears in. */
  episode: string[]
  url: string
  /** ISO 8601 creation timestamp. */
  created: string
}

/** Pagination metadata included in every list response. */
export interface ApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

/** Paginated list response from the Rick and Morty API. */
export interface ApiResponse<T> {
  info: ApiInfo
  results: T[]
}
