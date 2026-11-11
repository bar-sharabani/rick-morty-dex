import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import StatusBadge from '../components/StatusBadge'
import { useCharacters } from '../hooks/useCharacters'
import type { Character, CharacterStatus } from '../types/character'
import {
  CHARACTER_STATUSES,
  calculateStatusDistribution,
  getMostFeaturedCharacter,
  getTopSpecies,
  toPercentage,
  type SpeciesCount,
  type StatusDistribution,
} from '../utils/stats'

/** How many species rows the ranking card shows. */
const TOP_SPECIES_LIMIT = 5

const NO_CHARACTERS: readonly Character[] = []

/** Modifier class for each status bar, matching the status badge colours. */
const STATUS_BAR_CLASS: Record<CharacterStatus, string> = {
  Alive: 'stats-bar-fill--alive',
  Dead: 'stats-bar-fill--dead',
  unknown: 'stats-bar-fill--unknown',
}

const STATUS_LABEL: Record<CharacterStatus, string> = {
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
}

interface MultiverseStats {
  total: number
  statusDistribution: StatusDistribution
  topSpecies: SpeciesCount[]
  speciesCount: number
  mostFeatured: Character | null
}

function computeStats(characters: readonly Character[]): MultiverseStats {
  const allSpecies = getTopSpecies(characters)

  return {
    total: characters.length,
    statusDistribution: calculateStatusDistribution(characters),
    topSpecies: allSpecies.slice(0, TOP_SPECIES_LIMIT),
    speciesCount: allSpecies.length,
    mostFeatured: getMostFeaturedCharacter(characters),
  }
}

function formatEpisodes(count: number): string {
  return `${count} ${count === 1 ? 'episode' : 'episodes'}`
}

interface StatBarProps {
  label: string
  count: number
  percentage: number
  fillClassName?: string
}

/** A labelled horizontal bar with its count and percentage. */
function StatBar({ label, count, percentage, fillClassName = '' }: StatBarProps) {
  return (
    <li className="stats-bar">
      <div className="stats-bar-header">
        <span className="stats-bar-label">{label}</span>
        <span className="stats-bar-value">
          {count} <span className="stats-bar-percent">({percentage}%)</span>
        </span>
      </div>
      <div className="stats-bar-track" aria-hidden="true">
        <div
          className={`stats-bar-fill ${fillClassName}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </li>
  )
}

function StatsPage() {
  const { state, retry } = useCharacters()
  const characters = state.status === 'success' ? state.characters : NO_CHARACTERS
  const stats = useMemo(() => computeStats(characters), [characters])

  return (
    <section className="page stats-page">
      <h1>Multiverse Stats</h1>

      {state.status === 'loading' && <LoadingSpinner label="Crunching multiverse data…" />}

      {state.status === 'error' && (
        <ErrorMessage title="Couldn't load statistics" message={state.error} onRetry={retry} />
      )}

      {state.status === 'success' &&
        (stats.total === 0 ? (
          <p className="empty-state" role="status">
            No characters to analyse.
          </p>
        ) : (
          <>
            <p className="stats-intro">
              Based on a sample of {stats.total} characters from the Rick and Morty API.
            </p>

            <div className="stats-summary">
              <div className="stats-summary-item">
                <span className="stats-summary-value">{stats.total}</span>
                <span className="stats-summary-label">Characters</span>
              </div>
              <div className="stats-summary-item">
                <span className="stats-summary-value">{stats.statusDistribution.Alive}</span>
                <span className="stats-summary-label">Alive</span>
              </div>
              <div className="stats-summary-item">
                <span className="stats-summary-value">{stats.speciesCount}</span>
                <span className="stats-summary-label">Species</span>
              </div>
            </div>

            <div className="stats-grid">
              <article className="stats-card">
                <h2 className="stats-card-title">Status distribution</h2>
                <ul className="stats-bars">
                  {CHARACTER_STATUSES.map((status) => {
                    const count = stats.statusDistribution[status]
                    return (
                      <StatBar
                        key={status}
                        label={STATUS_LABEL[status]}
                        count={count}
                        percentage={toPercentage(count, stats.total)}
                        fillClassName={STATUS_BAR_CLASS[status]}
                      />
                    )
                  })}
                </ul>
              </article>

              <article className="stats-card">
                <h2 className="stats-card-title">Top species</h2>
                <ol className="stats-bars">
                  {stats.topSpecies.map(({ species, count, percentage }) => (
                    <StatBar
                      key={species}
                      label={species}
                      count={count}
                      percentage={percentage}
                    />
                  ))}
                </ol>
              </article>

              {stats.mostFeatured && (
                <article className="stats-card stats-card--featured">
                  <h2 className="stats-card-title">Most featured character</h2>
                  <Link
                    to={`/characters/${stats.mostFeatured.id}`}
                    className="stats-featured"
                  >
                    <img
                      className="stats-featured-image"
                      src={stats.mostFeatured.image}
                      alt={stats.mostFeatured.name}
                      width={96}
                      height={96}
                      loading="lazy"
                    />
                    <div className="stats-featured-body">
                      <span className="stats-featured-name">{stats.mostFeatured.name}</span>
                      <span className="stats-featured-episodes">
                        {formatEpisodes(stats.mostFeatured.episode.length)}
                      </span>
                      <StatusBadge status={stats.mostFeatured.status} />
                    </div>
                  </Link>
                </article>
              )}
            </div>
          </>
        ))}
    </section>
  )
}

export default StatsPage
