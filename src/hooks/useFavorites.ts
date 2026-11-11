import { useCallback, useMemo, useSyncExternalStore } from 'react'

/** localStorage key under which the favorited character IDs are saved. */
export const FAVORITES_STORAGE_KEY = 'rick-morty-dex:favorites'

type Listener = () => void

const NO_FAVORITES: readonly number[] = []
const listeners = new Set<Listener>()

/** In-memory copy of the stored IDs; `null` until first read from storage. */
let cachedIds: readonly number[] | null = null

function isCharacterId(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
}

/** Parses a stored JSON value into a de-duplicated list of valid IDs. */
function parseFavoriteIds(raw: string | null): readonly number[] {
  if (raw === null) return NO_FAVORITES
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return NO_FAVORITES
    const ids: unknown[] = parsed
    return [...new Set(ids.filter(isCharacterId))]
  } catch {
    // Corrupt or hand-edited value: start from an empty list.
    return NO_FAVORITES
  }
}

function readFromStorage(): readonly number[] {
  try {
    return parseFavoriteIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY))
  } catch {
    // Storage can be blocked (e.g. some private-browsing modes).
    return NO_FAVORITES
  }
}

function notify(): void {
  for (const listener of listeners) listener()
}

function getSnapshot(): readonly number[] {
  if (cachedIds === null) cachedIds = readFromStorage()
  return cachedIds
}

function getServerSnapshot(): readonly number[] {
  return NO_FAVORITES
}

function setFavoriteIds(ids: readonly number[]): void {
  cachedIds = ids
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Keep the in-memory list working even if it can't be persisted.
  }
  notify()
}

/** Keeps other open tabs in sync when favorites change there. */
function handleStorageEvent(event: StorageEvent): void {
  if (event.key !== FAVORITES_STORAGE_KEY && event.key !== null) return
  cachedIds = parseFavoriteIds(event.newValue)
  notify()
}

function subscribe(listener: Listener): () => void {
  if (listeners.size === 0) window.addEventListener('storage', handleStorageEvent)
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', handleStorageEvent)
  }
}

export interface UseFavoritesResult {
  /** Favorited character IDs, in the order they were added. */
  favoriteIds: readonly number[]
  isFavorite: (id: number) => boolean
  /** Adds the ID if it isn't saved yet, otherwise removes it. */
  toggleFavorite: (id: number) => void
  removeFavorite: (id: number) => void
}

/**
 * Favorited character IDs, persisted in `localStorage`.
 * All components using this hook share one list and re-render together.
 */
export function useFavorites(): UseFavoritesResult {
  const favoriteIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

  const isFavorite = useCallback((id: number) => favoriteSet.has(id), [favoriteSet])

  const toggleFavorite = useCallback((id: number) => {
    const current = getSnapshot()
    setFavoriteIds(
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    )
  }, [])

  const removeFavorite = useCallback((id: number) => {
    const current = getSnapshot()
    if (current.includes(id)) setFavoriteIds(current.filter((savedId) => savedId !== id))
  }, [])

  return { favoriteIds, isFavorite, toggleFavorite, removeFavorite }
}
