import { useMemo, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchBar from '../components/SearchBar'
import { useCharacters } from '../hooks/useCharacters'
import type { Character } from '../types/character'
import { filterCharacters, type StatusFilter } from '../utils/filterCharacters'

const NO_CHARACTERS: readonly Character[] = []

function HomePage() {
  const { state, retry } = useCharacters()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const characters = state.status === 'success' ? state.characters : NO_CHARACTERS
  const visibleCharacters = useMemo(
    () => filterCharacters(characters, { query, status }),
    [characters, query, status],
  )

  return (
    <section className="page">
      <h1>Characters</h1>

      <SearchBar
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {state.status === 'loading' && <LoadingSpinner label="Loading characters…" />}

      {state.status === 'error' && (
        <ErrorMessage
          title="Couldn't load characters"
          message={state.error}
          onRetry={retry}
        />
      )}

      {state.status === 'success' &&
        (visibleCharacters.length > 0 ? (
          <ul className="character-grid">
            {visibleCharacters.map((character) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state" role="status">
            No characters match your search.
          </p>
        ))}
    </section>
  )
}

export default HomePage
