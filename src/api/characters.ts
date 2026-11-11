import type { ApiResponse, Character } from '../types/character'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

/** Error thrown when the API responds with a non-2xx status. */
export class ApiError extends Error {
  readonly status: number

  constructor(status: number) {
    super(`Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * Fetches the first page (20 characters) from the Rick and Morty API.
 * Throws an `ApiError` when the server returns a non-2xx status.
 */
export async function fetchCharacters(
  signal?: AbortSignal,
): Promise<ApiResponse<Character>> {
  const response = await fetch(`${API_BASE_URL}/character`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status)
  }

  return (await response.json()) as ApiResponse<Character>
}

/**
 * Fetches a single character by ID.
 * Throws an `ApiError` (status 404 for unknown IDs) on a non-2xx response.
 */
export async function fetchCharacter(
  id: number,
  signal?: AbortSignal,
): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status)
  }

  return (await response.json()) as Character
}
