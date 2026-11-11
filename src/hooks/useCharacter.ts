import { useCallback, useEffect, useState } from 'react'
import { ApiError, fetchCharacter } from '../api/characters'
import type { Character } from '../types/character'
import { toErrorMessage } from '../utils/errorMessage'

/** The three possible states of a single-character request. */
export type CharacterState =
  | { status: 'loading' }
  | { status: 'error'; error: string; notFound: boolean }
  | { status: 'success'; character: Character }

export interface UseCharacterResult {
  state: CharacterState
  /** Re-runs the request (e.g. after a network failure). */
  retry: () => void
}

/** Parses a route param into a positive integer ID, or `null` if invalid. */
function parseCharacterId(id: string | undefined): number | null {
  if (id === undefined || !/^\d+$/.test(id)) return null
  const parsed = Number(id)
  return parsed > 0 ? parsed : null
}

const INVALID_ID_STATE: CharacterState = {
  status: 'error',
  error: 'That is not a valid character ID.',
  notFound: true,
}

/** Loads one character by its route ID and tracks loading / error / success state. */
export function useCharacter(id: string | undefined): UseCharacterResult {
  const characterId = parseCharacterId(id)
  const [result, setResult] = useState<{ key: string; state: CharacterState } | null>(null)
  const [attempt, setAttempt] = useState(0)
  const requestKey = `${characterId}:${attempt}`

  useEffect(() => {
    if (characterId === null) return
    const controller = new AbortController()

    fetchCharacter(characterId, controller.signal)
      .then((character) => {
        setResult({ key: requestKey, state: { status: 'success', character } })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const notFound = error instanceof ApiError && error.status === 404
        setResult({
          key: requestKey,
          state: { status: 'error', error: toErrorMessage(error), notFound },
        })
      })

    return () => controller.abort()
  }, [characterId, requestKey])

  const retry = useCallback(() => {
    setAttempt((n) => n + 1)
  }, [])

  let state: CharacterState
  if (characterId === null) {
    state = INVALID_ID_STATE
  } else if (result === null || result.key !== requestKey) {
    // A new ID or retry started; anything stored belongs to a previous request.
    state = { status: 'loading' }
  } else {
    state = result.state
  }

  return { state, retry }
}
