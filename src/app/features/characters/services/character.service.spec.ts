import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';
import { Character } from '../models/character.interface';
import { CharacterResponse } from '../models/character-response.interface';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
    });

    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('should fetch characters without page parameter', () => {
      const mockResponse: CharacterResponse = {
        info: { count: 826, pages: 42, next: 'next-url', prev: null },
        results: [],
      };

      service.getCharacters().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHARACTERS);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch characters with page parameter', () => {
      const mockResponse: CharacterResponse = {
        info: { count: 826, pages: 42, next: 'next-url', prev: 'prev-url' },
        results: [],
      };

      service.getCharacters(2).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_ENDPOINTS.CHARACTERS}?page=2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getCharacterById', () => {
    it('should fetch a character by ID', () => {
      const mockCharacter: Character = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'https://example.com/rick.jpg',
        episode: [],
        url: '',
        created: '2017-11-04T18:48:46.250Z',
      };

      service.getCharacterById(1).subscribe((character) => {
        expect(character).toEqual(mockCharacter);
      });

      const req = httpMock.expectOne(API_ENDPOINTS.CHARACTER_BY_ID(1));
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacter);
    });
  });

  describe('searchCharacters', () => {
    it('should search characters by name', () => {
      const mockResponse: CharacterResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [],
      };

      service.searchCharacters('Rick').subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(API_ENDPOINTS.SEARCH_CHARACTERS('Rick'));
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
