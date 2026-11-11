import { Link } from 'react-router-dom'
import type { Character } from '../types/character'
import FavoriteButton from './FavoriteButton'
import StatusBadge from './StatusBadge'

interface CharacterCardProps {
  /** The character to display. Only the fields shown on the card are required. */
  character: Pick<Character, 'id' | 'name' | 'image' | 'species' | 'status'>
}

function CharacterCard({ character }: CharacterCardProps) {
  const { id, name, image, species, status } = character

  return (
    <article className="character-card">
      <Link to={`/characters/${id}`} className="character-card-link">
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
          <StatusBadge status={status} />
        </div>
      </Link>
      {/* A sibling of the link: buttons can't be nested inside <a>. */}
      <FavoriteButton
        characterId={id}
        characterName={name}
        className="character-card-favorite"
      />
    </article>
  )
}

export default CharacterCard
