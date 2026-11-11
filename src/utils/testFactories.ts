import type { Character } from '../types/character'

let nextId = 1

/** Builds a fully-typed {@link Character} for tests; override only the fields a test cares about. */
export function makeCharacter(overrides: Partial<Character> = {}): Character {
  const id = overrides.id ?? nextId++
  return {
    id,
    name: `Character ${id}`,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'unknown',
    origin: { name: 'unknown', url: '' },
    location: { name: 'unknown', url: '' },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    episode: [],
    url: `https://rickandmortyapi.com/api/character/${id}`,
    created: '2017-11-04T18:48:46.250Z',
    ...overrides,
  }
}

/** Returns `count` fake episode URLs. */
export function makeEpisodes(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `https://rickandmortyapi.com/api/episode/${i + 1}`)
}
