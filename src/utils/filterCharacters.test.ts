import { describe, expect, it } from 'vitest'
import type { Character } from '../types/character'
import { filterCharacters, isStatusFilter } from './filterCharacters'
import { makeCharacter } from './testFactories'

const rick = makeCharacter({ name: 'Rick Sanchez', status: 'Alive' })
const morty = makeCharacter({ name: 'Morty Smith', status: 'Alive' })
const evilRick = makeCharacter({ name: 'Evil Rick', status: 'Dead' })
const birdperson = makeCharacter({ name: 'Birdperson', status: 'unknown' })

const characters: readonly Character[] = [rick, morty, evilRick, birdperson]

describe('filterCharacters', () => {
  describe('by name', () => {
    it('matches names case-insensitively', () => {
      expect(filterCharacters(characters, { query: 'RICK', status: 'all' })).toEqual([rick, evilRick])
      expect(filterCharacters(characters, { query: 'rIcK', status: 'all' })).toEqual([rick, evilRick])
    })

    it('matches partial names and trims surrounding whitespace', () => {
      expect(filterCharacters(characters, { query: '  smi  ', status: 'all' })).toEqual([morty])
    })

    it('returns every character for an empty or whitespace-only query', () => {
      expect(filterCharacters(characters, { query: '', status: 'all' })).toEqual(characters)
      expect(filterCharacters(characters, { query: '   ', status: 'all' })).toEqual(characters)
    })

    it('returns an empty list when nothing matches', () => {
      expect(filterCharacters(characters, { query: 'Jerry', status: 'all' })).toEqual([])
    })
  })

  describe('by status', () => {
    it('keeps only characters with the selected status', () => {
      expect(filterCharacters(characters, { query: '', status: 'Alive' })).toEqual([rick, morty])
      expect(filterCharacters(characters, { query: '', status: 'Dead' })).toEqual([evilRick])
      expect(filterCharacters(characters, { query: '', status: 'unknown' })).toEqual([birdperson])
    })

    it('does not filter by status when status is "all"', () => {
      expect(filterCharacters(characters, { query: '', status: 'all' })).toHaveLength(characters.length)
    })
  })

  describe('by name and status combined', () => {
    it('requires both criteria to match', () => {
      expect(filterCharacters(characters, { query: 'rick', status: 'Dead' })).toEqual([evilRick])
      expect(filterCharacters(characters, { query: 'rick', status: 'Alive' })).toEqual([rick])
    })

    it('returns an empty list when the name matches but the status does not', () => {
      expect(filterCharacters(characters, { query: 'morty', status: 'Dead' })).toEqual([])
    })
  })

  it('does not mutate the input and preserves order', () => {
    const input = [...characters]
    filterCharacters(input, { query: 'r', status: 'all' })
    expect(input).toEqual(characters)
  })
})

describe('isStatusFilter', () => {
  it('accepts valid status filters and rejects anything else', () => {
    expect(isStatusFilter('all')).toBe(true)
    expect(isStatusFilter('Dead')).toBe(true)
    expect(isStatusFilter('dead')).toBe(false)
    expect(isStatusFilter('')).toBe(false)
  })
})
