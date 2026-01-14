import { Component, input, output } from '@angular/core';
import { Character } from '../../models/character.interface';
import { AvatarComponent } from '../../../../shared/atoms/avatar/avatar.component';
import { StatusIndicatorComponent } from '../../../../shared/molecules/status-indicator/status-indicator.component';

/**
 * Componente Organism: CharacterCard
 * Tarjeta individual de personaje con toda su información
 * Principios: Single Responsibility, Composition
 */
@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [AvatarComponent, StatusIndicatorComponent],
  template: `
    <article
      class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      (click)="cardClick.emit(character())"
      [attr.aria-label]="'Tarjeta de ' + character().name"
    >
      <!-- Avatar -->
      <div class="aspect-square overflow-hidden">
        <app-avatar
          [src]="character().image"
          [alt]="character().name"
        />
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        <!-- Name -->
        <h3 class="text-xl font-bold text-gray-900 dark:text-white truncate">
          {{ character().name }}
        </h3>

        <!-- Status -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">Estado:</span>
          <app-status-indicator [status]="character().status" />
        </div>

        <!-- Species -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600 dark:text-gray-400">Especie:</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            {{ character().species }}
          </span>
        </div>

        <!-- Location -->
        <div class="space-y-1">
          <p class="text-sm text-gray-600 dark:text-gray-400">Ubicación:</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
            {{ character().location.name }}
          </p>
        </div>

        <!-- Origin -->
        <div class="space-y-1">
          <p class="text-sm text-gray-600 dark:text-gray-400">Origen:</p>
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
            {{ character().origin.name }}
          </p>
        </div>
      </div>
    </article>
  `,
})
export class CharacterCardComponent {
  // Angular 21 Signal Input & Output
  character = input.required<Character>();
  cardClick = output<Character>();
}
