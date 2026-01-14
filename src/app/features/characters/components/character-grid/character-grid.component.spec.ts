import { describe, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterGridComponent } from './character-grid.component';
import { Character } from '../../models/character.interface';

describe('CharacterGridComponent', () => {
  let component: CharacterGridComponent;
  let fixture: ComponentFixture<CharacterGridComponent>;

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
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://example.com/morty.jpg',
      episode: [],
      url: '',
      created: '2017-11-04T18:50:21.651Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render character cards for each character', () => {
    fixture.componentRef.setInput('characters', mockCharacters);
    fixture.detectChanges();
    
    const cards = fixture.nativeElement.querySelectorAll('app-character-card');
    expect(cards.length).toBe(2);
  });

  it('should show empty message when no characters', () => {
    fixture.componentRef.setInput('characters', []);
    fixture.detectChanges();
    
    const emptyMessage = fixture.nativeElement.textContent;
    expect(emptyMessage).toContain('No se encontraron personajes');
  });

  it('should emit characterSelect when card is clicked', () => {
    fixture.componentRef.setInput('characters', mockCharacters);
    fixture.detectChanges();
    
    const selectSpy = vi.fn();
    component.characterSelect.subscribe(selectSpy);
    
    // Simulate card click by emitting from child component
    const firstCard = fixture.debugElement.query(
      (el) => el.name === 'app-character-card'
    );
    
    if (firstCard) {
      firstCard.componentInstance.cardClick.emit(mockCharacters[0]);
      expect(selectSpy).toHaveBeenCalledWith(mockCharacters[0]);
    }
  });

  it('should have grid layout classes', () => {
    fixture.detectChanges();
    
    const grid = fixture.nativeElement.querySelector('[role="list"]');
    expect(grid.classList.contains('grid')).toBe(true);
  });
});
