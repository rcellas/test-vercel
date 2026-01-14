import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CharacterListPageComponent } from './character-list-page.component';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';
import { CharacterResponse } from '../../models/character-response.interface';

describe('CharacterListPageComponent', () => {
  let component: CharacterListPageComponent;
  let fixture: ComponentFixture<CharacterListPageComponent>;
  let mockCharacterService: any;

  const mockCharacters: Character[] = [
    {
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
    },
  ];

  const mockResponse: CharacterResponse = {
    info: { count: 1, pages: 1, next: null, prev: null },
    results: mockCharacters,
  };

  beforeEach(async () => {
    mockCharacterService = {
      getCharacters: vi.fn().mockReturnValue(of(mockResponse)),
    };

    await TestBed.configureTestingModule({
      imports: [CharacterListPageComponent],
      providers: [
        { provide: CharacterService, useValue: mockCharacterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    fixture.detectChanges();
    
    expect(mockCharacterService.getCharacters).toHaveBeenCalled();
    expect(component.characters()).toEqual(mockCharacters);
    expect(component.loading()).toBe(false);
    expect(component.error()).toBeNull();
  });

  it('should set loading state while fetching', () => {
    // Before ngOnInit
    expect(component.loading()).toBe(false);
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    // After successful load
    expect(component.loading()).toBe(false);
  });

  it('should handle error state', () => {
    mockCharacterService.getCharacters.mockReturnValue(
      throwError(() => new Error('API Error'))
    );

    fixture.detectChanges();
    
    expect(component.error()).toBeTruthy();
    expect(component.error()).toContain('No se pudieron cargar los personajes');
    expect(component.loading()).toBe(false);
  });

  it('should retry loading on error retry', () => {
    mockCharacterService.getCharacters
      .mockReturnValueOnce(throwError(() => new Error('API Error')))
      .mockReturnValueOnce(of(mockResponse));

    fixture.detectChanges();
    expect(component.error()).toBeTruthy();

    // Retry
    component.loadCharacters();
    
    expect(mockCharacterService.getCharacters).toHaveBeenCalledTimes(2);
    expect(component.characters()).toEqual(mockCharacters);
    expect(component.error()).toBeNull();
  });

  it('should handle character selection', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    
    component.onCharacterSelect(mockCharacters[0]);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Personaje seleccionado:',
      mockCharacters[0]
    );
  });

  it('should render spinner when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('app-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should render error message when error occurs', () => {
    component.error.set('Test error');
    component.loading.set(false);
    fixture.detectChanges();
    
    const errorMsg = fixture.nativeElement.querySelector('app-error-message');
    expect(errorMsg).toBeTruthy();
  });

  it('should render character grid when data loaded', () => {
    component.characters.set(mockCharacters);
    component.loading.set(false);
    component.error.set(null);
    fixture.detectChanges();
    
    const grid = fixture.nativeElement.querySelector('app-character-grid');
    expect(grid).toBeTruthy();
  });
});
