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
 * Fetches several characters in one request (`/character/1,2,3`).
 * IDs that don't exist are simply missing from the result.
 */
export async function fetchCharactersByIds(
  ids: readonly number[],
  signal?: AbortSignal,
): Promise<Character[]> {
  if (ids.length === 0) return []

  const response = await fetch(`${API_BASE_URL}/character/${ids.join(',')}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status)
  }

  // The API returns a single object (not an array) when only one ID is requested.
  const data = (await response.json()) as Character | Character[]
  return Array.isArray(data) ? data : [data]
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
