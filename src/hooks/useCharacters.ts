import { useCallback, useEffect, useState } from 'react'
import { fetchCharacters } from '../api/characters'
import type { Character } from '../types/character'

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

function toErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return 'Could not reach the Rick and Morty API. Check your connection and try again.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
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
