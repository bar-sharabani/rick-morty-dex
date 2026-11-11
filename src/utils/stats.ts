import type { Character, CharacterStatus } from '../types/character'

/** Number of characters per life status. Every status is always present (0 when absent). */
export type StatusDistribution = Record<CharacterStatus, number>

/** Every status in display order. */
export const CHARACTER_STATUSES: readonly CharacterStatus[] = ['Alive', 'Dead', 'unknown']

/** One row of the species ranking. */
export interface SpeciesCount {
  species: string
  count: number
  /** Share of all characters, 0–100, rounded to one decimal place. */
  percentage: number
}

/** Converts `part / total` to a percentage with one decimal place (0 when `total` is 0). */
export function toPercentage(part: number, total: number): number {
  if (total === 0) return 0
  return Math.round((part / total) * 1000) / 10
}

/**
 * Counts how many characters are Alive, Dead, and unknown.
 * Pure: the input array is never mutated.
 */
export function calculateStatusDistribution(
  characters: readonly Pick<Character, 'status'>[],
): StatusDistribution {
  const distribution: StatusDistribution = { Alive: 0, Dead: 0, unknown: 0 }

  for (const { status } of characters) {
    distribution[status] += 1
  }

  return distribution
}

/**
 * Ranks species by how many characters belong to each, most common first.
 * Ties are broken alphabetically so the order is deterministic.
 * @param limit Maximum number of rows to return; omit for the full ranking.
 */
export function getTopSpecies(
  characters: readonly Pick<Character, 'species'>[],
  limit?: number,
): SpeciesCount[] {
  const counts = new Map<string, number>()

  for (const { species } of characters) {
    const name = species.trim() || 'unknown'
    counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  const ranking = [...counts.entries()]
    .map(([species, count]): SpeciesCount => ({
      species,
      count,
      percentage: toPercentage(count, characters.length),
    }))
    .sort((a, b) => b.count - a.count || a.species.localeCompare(b.species))

  return limit === undefined ? ranking : ranking.slice(0, Math.max(0, limit))
}

/**
 * Returns the character that appears in the most episodes, or `null` for an empty list.
 * On a tie, the character that comes first in the list wins.
 */
export function getMostFeaturedCharacter<T extends Pick<Character, 'episode'>>(
  characters: readonly T[],
): T | null {
  let top: T | null = null

  for (const character of characters) {
    if (top === null || character.episode.length > top.episode.length) {
      top = character
    }
  }

  return top
}

