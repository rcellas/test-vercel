import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Atom: Avatar
 * Avatar de imagen con manejo de errores y fallback
 * Principios: KISS, Single Responsibility
 */
@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block">
      @if (!imageError()) {
        <img
          [src]="src()"
          [alt]="alt()"
          (error)="onImageError()"
          class="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      } @else {
        <div
          class="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center"
        >
          <span class="text-gray-500 dark:text-gray-400 text-4xl">?</span>
        </div>
      }
    </div>
  `,
})
export class AvatarComponent {
  // Angular 21 Signal Inputs
  src = input.required<string>();
  alt = input.required<string>();

  // Estado interno para manejo de errores
  imageError = signal(false);

  onImageError(): void {
    this.imageError.set(true);
  }
}
