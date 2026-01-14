import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { CharacterResponse } from '../models/character-response.interface';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';

/**
 * Servicio de dominio: Characters
 * Maneja todas las operaciones relacionadas con personajes
 * Principios: Single Responsibility, Dependency Inversion
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  // Angular 21: Inyección con inject() function
  private readonly http = inject(HttpClient);

  /**
   * Obtiene lista paginada de personajes
   * @param page Número de página (opcional)
   */
  getCharacters(page?: number): Observable<CharacterResponse> {
    const url = page 
      ? `${API_ENDPOINTS.CHARACTERS}?page=${page}` 
      : API_ENDPOINTS.CHARACTERS;
    return this.http.get<CharacterResponse>(url);
  }

  /**
   * Obtiene un personaje por ID
   * @param id ID del personaje
   */
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(API_ENDPOINTS.CHARACTER_BY_ID(id));
  }

  /**
   * Busca personajes por nombre
   * @param name Nombre a buscar
   */
  searchCharacters(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(API_ENDPOINTS.SEARCH_CHARACTERS(name));
  }
}
