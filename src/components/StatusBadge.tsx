import type { CharacterStatus } from '../types/character'

interface StatusBadgeProps {
  status: CharacterStatus
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

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge ${STATUS_CLASS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  )
}

export default StatusBadge
