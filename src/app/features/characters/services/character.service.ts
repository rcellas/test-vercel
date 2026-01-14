import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { CharacterResponse } from '../models/character-response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCharacters(page?: number): Observable<CharacterResponse> {
    const url = page 
      ? `${this.apiUrl}/character?page=${page}` 
      : `${this.apiUrl}/character`;
    return this.http.get<CharacterResponse>(url);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }

  searchCharacters(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}/character/?name=${name}`);
  }
}
