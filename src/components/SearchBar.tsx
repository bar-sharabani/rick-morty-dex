import type { ChangeEvent } from 'react'
import { STATUS_FILTERS, isStatusFilter, type StatusFilter } from '../utils/filterCharacters'

interface SearchBarProps {
  query: string
  status: StatusFilter
  onQueryChange: (query: string) => void
  onStatusChange: (status: StatusFilter) => void
}

/** Text shown for each status option (the API value for unknown is lowercase). */
const STATUS_FILTER_LABEL: Record<StatusFilter, string> = {
  all: 'All statuses',
  Alive: 'Alive',
  Dead: 'Dead',
  unknown: 'Unknown',
}

/** Controlled search input + status dropdown. Holds no state of its own. */
function SearchBar({ query, status, onQueryChange, onStatusChange }: SearchBarProps) {
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value)
  }

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (isStatusFilter(value)) {
      onStatusChange(value)
    }
  }

  return (
    <form className="search-bar" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="search-bar-field search-bar-field--query">
        <span className="search-bar-label">Search by name</span>
        <input
          className="search-bar-input"
          type="search"
          placeholder="e.g. Rick"
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
        />
      </label>

      <label className="search-bar-field">
        <span className="search-bar-label">Status</span>
        <select className="search-bar-input" value={status} onChange={handleStatusChange}>
          {STATUS_FILTERS.map((option) => (
            <option key={option} value={option}>
              {STATUS_FILTER_LABEL[option]}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}

export default SearchBar
