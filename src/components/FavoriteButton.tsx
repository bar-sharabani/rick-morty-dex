import { useFavorites } from '../hooks/useFavorites'

interface FavoriteButtonProps {
  characterId: number
  /** Used in the accessible name, e.g. "Favorite Rick Sanchez". */
  characterName: string
  /**
   * `icon`: round star-only button (overlaid on cards).
   * `labeled`: star with a text label (detail page).
   */
  variant?: 'icon' | 'labeled'
  className?: string
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="favorite-button-star"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    >
      <path d="M12 2.8l2.84 5.76 6.36.92-4.6 4.49 1.08 6.33L12 17.31l-5.68 2.99 1.08-6.33-4.6-4.49 6.36-.92z" />
    </svg>
  )
}

/** Star toggle that adds / removes a character from favorites. */
function FavoriteButton({
  characterId,
  characterName,
  variant = 'icon',
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(characterId)

  const classes = [
    'favorite-button',
    `favorite-button--${variant}`,
    active ? 'favorite-button--active' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const actionLabel = active ? 'Remove from favorites' : 'Add to favorites'

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={active}
      aria-label={variant === 'icon' ? `Favorite ${characterName}` : undefined}
      title={`${actionLabel}: ${characterName}`}
      onClick={() => toggleFavorite(characterId)}
    >
      <StarIcon filled={active} />
      {variant === 'labeled' && (
        <span className="favorite-button-label">{active ? 'Favorited' : 'Add to favorites'}</span>
      )}
    </button>
  )
}

export default FavoriteButton
