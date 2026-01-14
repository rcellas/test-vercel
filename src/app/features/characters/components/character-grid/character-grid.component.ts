import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.interface';
import { CharacterCardComponent } from '../character-card/character-card.component';

/**
 * Componente Organism: CharacterGrid
 * Grid responsive de tarjetas de personajes
 * Principios: Single Responsibility, KISS
 */
@Component({
  selector: 'app-character-grid',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent],
  template: `
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
      [attr.aria-label]="'Grid de ' + characters().length + ' personajes'"
    >
      @for (character of characters(); track character.id) {
        <app-character-card
          [character]="character"
          (cardClick)="characterSelect.emit($event)"
          role="listitem"
        />
      } @empty {
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500 dark:text-gray-400 text-lg">
            No se encontraron personajes
          </p>
        </div>
      }
    </div>
  `,
})
export class CharacterGridComponent {
  // Angular 21 Signal Input & Output
  characters = input<Character[]>([]);
  characterSelect = output<Character>();
}
