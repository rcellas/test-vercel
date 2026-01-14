/**
 * Constantes de API para Rick and Morty
 * Sin usar archivos de environment - hardcoded según requerimiento
 */

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS = {
  CHARACTERS: `${API_BASE_URL}/character`,
  CHARACTER_BY_ID: (id: number) => `${API_BASE_URL}/character/${id}`,
  SEARCH_CHARACTERS: (name: string) => `${API_BASE_URL}/character/?name=${name}`,
} as const;
