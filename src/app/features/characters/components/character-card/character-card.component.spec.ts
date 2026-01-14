import { describe, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { Character } from '../../models/character.interface';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '2017-11-04T18:48:46.250Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should display character name', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const nameElement = fixture.nativeElement.querySelector('h3');
    expect(nameElement.textContent?.trim()).toBe('Rick Sanchez');
  });

  it('should display character species', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Human');
  });

  it('should display character location', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Citadel of Ricks');
  });

  it('should display character origin', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Earth (C-137)');
  });

  it('should emit cardClick event when clicked', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const clickSpy = vi.fn();
    component.cardClick.subscribe(clickSpy);
    
    const article = fixture.nativeElement.querySelector('article');
    article.click();
    
    expect(clickSpy).toHaveBeenCalledWith(mockCharacter);
  });

  it('should render avatar component', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const avatar = fixture.nativeElement.querySelector('app-avatar');
    expect(avatar).toBeTruthy();
  });

  it('should render status indicator component', () => {
    fixture.componentRef.setInput('character', mockCharacter);
    fixture.detectChanges();
    
    const statusIndicator = fixture.nativeElement.querySelector('app-status-indicator');
    expect(statusIndicator).toBeTruthy();
  });
});
