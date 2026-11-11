import { Link } from 'react-router-dom'
import CharacterCard from '../components/CharacterCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCharactersByIds } from '../hooks/useCharactersByIds'
import { useFavorites } from '../hooks/useFavorites'

function formatSavedCount(count: number): string {
  return `${count} saved ${count === 1 ? 'character' : 'characters'}`
}

function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { state, retry } = useCharactersByIds(favoriteIds)

  return (
    <section className="page">
      <h1>Favorites</h1>

      {state.status === 'loading' && <LoadingSpinner label="Loading favorites…" />}

      {state.status === 'error' && (
        <ErrorMessage title="Couldn't load favorites" message={state.error} onRetry={retry} />
      )}

      {state.status === 'success' &&
        (state.characters.length > 0 ? (
          <>
            <p className="favorites-count">{formatSavedCount(state.characters.length)}</p>
            <ul className="character-grid">
              {state.characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="empty-state empty-state--favorites" role="status">
            <p className="empty-state-title">No favorites saved yet</p>
            <p>Tap the star on any character to save it here.</p>
            <Link to="/" className="empty-state-link">
              Browse characters
            </Link>
          </div>
        ))}
    </section>
  )
}

export default FavoritesPage
