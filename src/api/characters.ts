import type { ApiResponse, Character } from '../types/character'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

/**
 * Fetches the first page (20 characters) from the Rick and Morty API.
 * Throws an `Error` when the request fails or the server returns a non-2xx status.
 */
export async function fetchCharacters(
  signal?: AbortSignal,
): Promise<ApiResponse<Character>> {
  const response = await fetch(`${API_BASE_URL}/character`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as ApiResponse<Character>
}
