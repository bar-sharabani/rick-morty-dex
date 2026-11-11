import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'
import { useCharacter } from '../hooks/useCharacter'
import type { Character } from '../types/character'

type CharacterDetailParams = {
  id: string
}

interface DetailField {
  label: string
  value: string
}

/** The API uses "unknown" (lowercase) for missing values; show it capitalised. */
function displayValue(value: string): string {
  return value === 'unknown' || value === '' ? 'Unknown' : value
}

function formatEpisodeCount(count: number): string {
  return `${count} ${count === 1 ? 'episode' : 'episodes'}`
}

function getDetailFields(character: Character): DetailField[] {
  return [
    { label: 'Species', value: displayValue(character.species) },
    { label: 'Gender', value: displayValue(character.gender) },
    { label: 'Origin', value: displayValue(character.origin.name) },
    { label: 'Last known location', value: displayValue(character.location.name) },
    { label: 'Appearances', value: formatEpisodeCount(character.episode.length) },
  ]
}

function CharacterDetailPage() {
  const { id } = useParams<CharacterDetailParams>()
  const { state, retry } = useCharacter(id)

  return (
    <section className="page character-detail-page">
      <Link to="/" className="back-link">
        ← Back to Characters
      </Link>

      {state.status === 'loading' && <LoadingSpinner label="Loading character…" />}

      {state.status === 'error' && (
        <ErrorMessage
          title={state.notFound ? 'Character not found' : "Couldn't load character"}
          message={state.error}
          onRetry={state.notFound ? undefined : retry}
        />
      )}

      {state.status === 'success' && (
        <article className="character-detail">
          <img
            className="character-detail-image"
            src={state.character.image}
            alt={state.character.name}
            width={300}
            height={300}
          />
          <div className="character-detail-body">
            <h1 className="character-detail-name">{state.character.name}</h1>
            <StatusBadge status={state.character.status} />
            <dl className="character-detail-fields">
              {getDetailFields(state.character).map(({ label, value }) => (
                <div key={label} className="character-detail-field">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      )}
    </section>
  )
}

export default CharacterDetailPage
