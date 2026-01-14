import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center" [attr.aria-label]="'Cargando'">
      <div
        class="animate-spin rounded-full border-t-2 border-b-2"
        [ngClass]="{
          'h-8 w-8 border-blue-500': size() === 'sm',
          'h-12 w-12 border-blue-600': size() === 'md',
          'h-16 w-16 border-blue-700': size() === 'lg'
        }"
        role="status"
      >
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
  `,
})
export class SpinnerComponent {

  size = input<'sm' | 'md' | 'lg'>('md');
}
