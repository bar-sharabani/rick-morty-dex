import { Link } from 'react-router-dom'
import type { Character, CharacterStatus } from '../types/character'

interface CharacterCardProps {
  /** The character to display. Only the fields shown on the card are required. */
  character: Pick<Character, 'id' | 'name' | 'image' | 'species' | 'status'>
}

/** Modifier class for the status badge, keyed by every possible API status. */
const STATUS_CLASS: Record<CharacterStatus, string> = {
  Alive: 'status-badge--alive',
  Dead: 'status-badge--dead',
  unknown: 'status-badge--unknown',
}

/** Text shown inside the status badge (the API returns lowercase "unknown"). */
const STATUS_LABEL: Record<CharacterStatus, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
}

function CharacterCard({ character }: CharacterCardProps) {
  const { id, name, image, species, status } = character

  return (
    <Link to={`/characters/${id}`} className="character-card">
      <img
        className="character-card-image"
        src={image}
        alt={name}
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="character-card-body">
        <h2 className="character-card-name">{name}</h2>
        <p className="character-card-species">{species}</p>
        <span className={`status-badge ${STATUS_CLASS[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
    </Link>
  )
}

export default CharacterCard
