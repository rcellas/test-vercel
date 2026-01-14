

import { Character } from './character.interface';

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: PaginationInfo;
  results: Character[];
}
