import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useCharacters } from '../hooks/useCharacters'

function HomePage() {
  const { state, retry } = useCharacters()

  return (
    <section className="page">
      <h1>Characters</h1>

      {state.status === 'loading' && <LoadingSpinner label="Loading characters…" />}

      {state.status === 'error' && (
        <ErrorMessage
          title="Couldn't load characters"
          message={state.error}
          onRetry={retry}
        />
      )}

      {state.status === 'success' && (
        <ul className="character-list">
          {state.characters.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default HomePage
