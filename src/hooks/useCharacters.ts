import { useCallback, useEffect, useState } from 'react'
import { fetchCharacters } from '../api/characters'
import type { Character } from '../types/character'
import { toErrorMessage } from '../utils/errorMessage'

/** The three possible states of the character request. */
export type CharactersState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; characters: Character[] }

export interface UseCharactersResult {
  state: CharactersState
  /** Re-runs the request (e.g. after a network failure). */
  retry: () => void
}

/** Loads the character list and tracks loading / error / success state. */
export function useCharacters(): UseCharactersResult {
  const [state, setState] = useState<CharactersState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCharacters(controller.signal)
      .then((data) => {
        setState({ status: 'success', characters: data.results })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({ status: 'error', error: toErrorMessage(error) })
      })

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { state, retry }
}
