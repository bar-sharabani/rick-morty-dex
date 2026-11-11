import { describe, expect, it } from 'vitest'
import {
  calculateStatusDistribution,
  getMostFeaturedCharacter,
  getTopSpecies,
  toPercentage,
} from './stats'
import { makeCharacter, makeEpisodes } from './testFactories'

describe('calculateStatusDistribution', () => {
  it('returns zero for every status on an empty list', () => {
    expect(calculateStatusDistribution([])).toEqual({ Alive: 0, Dead: 0, unknown: 0 })
  })

  it('counts each status separately', () => {
    const characters = [
      makeCharacter({ status: 'Alive' }),
      makeCharacter({ status: 'Alive' }),
      makeCharacter({ status: 'Dead' }),
      makeCharacter({ status: 'unknown' }),
      makeCharacter({ status: 'Alive' }),
    ]
    expect(calculateStatusDistribution(characters)).toEqual({ Alive: 3, Dead: 1, unknown: 1 })
  })

  it('keeps missing statuses at zero when all characters share one status', () => {
    const characters = [makeCharacter({ status: 'Dead' }), makeCharacter({ status: 'Dead' })]
    expect(calculateStatusDistribution(characters)).toEqual({ Alive: 0, Dead: 2, unknown: 0 })
  })
})

describe('getTopSpecies', () => {
  const characters = [
    makeCharacter({ species: 'Human' }),
    makeCharacter({ species: 'Human' }),
    makeCharacter({ species: 'Human' }),
    makeCharacter({ species: 'Alien' }),
    makeCharacter({ species: 'Alien' }),
    makeCharacter({ species: 'Robot' }),
  ]

  it('ranks species by count with percentages of the total', () => {
    expect(getTopSpecies(characters)).toEqual([
      { species: 'Human', count: 3, percentage: 50 },
      { species: 'Alien', count: 2, percentage: 33.3 },
      { species: 'Robot', count: 1, percentage: 16.7 },
    ])
  })

  it('respects the limit argument', () => {
    expect(getTopSpecies(characters, 2).map((row) => row.species)).toEqual(['Human', 'Alien'])
    expect(getTopSpecies(characters, 0)).toEqual([])
  })

  it('breaks ties alphabetically and groups blank species as "unknown"', () => {
    const tied = [
      makeCharacter({ species: 'Robot' }),
      makeCharacter({ species: 'Alien' }),
      makeCharacter({ species: '  ' }),
    ]
    expect(getTopSpecies(tied).map((row) => row.species)).toEqual(['Alien', 'Robot', 'unknown'])
  })

  it('returns an empty ranking for an empty list', () => {
    expect(getTopSpecies([])).toEqual([])
  })
})

describe('getMostFeaturedCharacter', () => {
  it('returns null for an empty list', () => {
    expect(getMostFeaturedCharacter([])).toBeNull()
  })

  it('returns the character with the most episodes', () => {
    const rick = makeCharacter({ name: 'Rick', episode: makeEpisodes(51) })
    const morty = makeCharacter({ name: 'Morty', episode: makeEpisodes(40) })
    const jerry = makeCharacter({ name: 'Jerry', episode: makeEpisodes(3) })
    expect(getMostFeaturedCharacter([morty, rick, jerry])).toBe(rick)
  })

  it('prefers the first character in the list on a tie', () => {
    const first = makeCharacter({ episode: makeEpisodes(5) })
    const second = makeCharacter({ episode: makeEpisodes(5) })
    expect(getMostFeaturedCharacter([first, second])).toBe(first)
  })
})

describe('toPercentage', () => {
  it('rounds to one decimal place and returns 0 for a zero total', () => {
    expect(toPercentage(1, 3)).toBe(33.3)
    expect(toPercentage(5, 0)).toBe(0)
  })
})
