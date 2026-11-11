import type { Character, CharacterStatus } from '../types/character'

/** Status filter value: a specific API status, or `'all'` to disable status filtering. */
export type StatusFilter = CharacterStatus | 'all'

/** Every value the status filter can take, in display order. */
export const STATUS_FILTERS: readonly StatusFilter[] = ['all', 'Alive', 'Dead', 'unknown']

/** Criteria applied by {@link filterCharacters}. */
export interface CharacterFilters {
  /** Free-text search matched against the character's name (case-insensitive, trimmed). */
  query: string
  status: StatusFilter
}

/** Narrows an arbitrary string (e.g. a `<select>` value) to a valid {@link StatusFilter}. */
export function isStatusFilter(value: string): value is StatusFilter {
  return (STATUS_FILTERS as readonly string[]).includes(value)
}

/**
 * Returns the characters that match both the name query and the status filter.
 * Pure: the input array is never mutated and the original order is preserved.
 */
export function filterCharacters<T extends Pick<Character, 'name' | 'status'>>(
  characters: readonly T[],
  { query, status }: CharacterFilters,
): T[] {
  const normalizedQuery = query.trim().toLowerCase()

  return characters.filter((character) => {
    const matchesStatus = status === 'all' || character.status === status
    const matchesQuery =
      normalizedQuery === '' || character.name.toLowerCase().includes(normalizedQuery)
    return matchesStatus && matchesQuery
  })
}
