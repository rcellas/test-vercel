import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
      role="alert"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          class="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        
        <div>
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error
          </h3>
          <p class="text-red-700 dark:text-red-300">
            {{ message() }}
          </p>
        </div>

        <button
          (click)="retry.emit()"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          type="button"
        >
          Reintentar
        </button>
      </div>
    </div>
  `,
})
export class ErrorMessageComponent {
  // Angular 21 Signal Input & Output
  message = input.required<string>();
  retry = output<void>();
}
