import { ApiError } from '../api/characters'

/** Turns any thrown value from an API call into a user-facing message. */
export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.status === 404) {
    return 'This character does not exist in any known dimension.'
  }
  if (error instanceof TypeError) {
    return 'Could not reach the Rick and Morty API. Check your connection and try again.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}
