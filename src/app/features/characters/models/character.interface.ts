/**
 * Interfaces para la API de Rick and Morty
 * Segregación de interfaces según principio SOLID (Interface Segregation)
 */

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface CharacterOrigin {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
