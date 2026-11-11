import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiError, fetchCharactersByIds } from '../api/characters'
import type { Character } from '../types/character'
import { toErrorMessage } from '../utils/errorMessage'

/** The three possible states of a multi-character request. */
export type CharactersByIdsState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; characters: Character[] }

export interface UseCharactersByIdsResult {
  state: CharactersByIdsState
  /** Re-runs the failed request. */
  retry: () => void
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

/**
 * Loads the characters for the given IDs, in the same order.
 * Already-loaded characters are kept, so removing an ID never triggers a refetch;
 * only newly added IDs are requested.
 */
export function useCharactersByIds(ids: readonly number[]): UseCharactersByIdsResult {
  const [loaded, setLoaded] = useState<ReadonlyMap<number, Character>>(() => new Map())
  /** IDs the API says don't exist; never requested again. */
  const [unavailable, setUnavailable] = useState<ReadonlySet<number>>(() => new Set())
  const [failure, setFailure] = useState<{ key: string; error: string } | null>(null)
  const [attempt, setAttempt] = useState(0)

  const missingIds = useMemo(
    () => ids.filter((id) => !loaded.has(id) && !unavailable.has(id)),
    [ids, loaded, unavailable],
  )
  const missingKey = missingIds.join(',')
  const requestKey = `${missingKey}:${attempt}`

  useEffect(() => {
    if (missingKey === '') return
    const requested = missingKey.split(',').map(Number)
    const controller = new AbortController()

    const markUnavailable = (gone: readonly number[]) => {
      if (gone.length > 0) setUnavailable((prev) => new Set([...prev, ...gone]))
    }

    fetchCharactersByIds(requested, controller.signal)
      .then((characters) => {
        setLoaded((prev) => {
          const next = new Map(prev)
          for (const character of characters) next.set(character.id, character)
          return next
        })
        const returned = new Set(characters.map((character) => character.id))
        markUnavailable(requested.filter((id) => !returned.has(id)))
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 404) {
          markUnavailable(requested)
          return
        }
        setFailure({ key: requestKey, error: toErrorMessage(error) })
      })

    return () => controller.abort()
  }, [missingKey, requestKey])

  const retry = useCallback(() => {
    setAttempt((n) => n + 1)
  }, [])

  let state: CharactersByIdsState
  if (missingIds.length === 0) {
    state = {
      status: 'success',
      characters: ids.map((id) => loaded.get(id)).filter(isDefined),
    }
  } else if (failure !== null && failure.key === requestKey) {
    state = { status: 'error', error: failure.error }
  } else {
    state = { status: 'loading' }
  }

  return { state, retry }
}
