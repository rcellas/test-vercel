import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      [ngClass]="{
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': variant() === 'success',
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': variant() === 'danger',
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': variant() === 'warning'
      }"
    >
      {{ text() }}
    </span>
  `,
})
export class BadgeComponent {
  // Angular 21 Signal Inputs (required)
  variant = input.required<'success' | 'danger' | 'warning'>();
  text = input.required<string>();
}
