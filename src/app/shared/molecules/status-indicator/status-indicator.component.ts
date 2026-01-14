import { Component, input, computed } from '@angular/core';
import { BadgeComponent } from '../../atoms/badge/badge.component';

/**
 * Componente Molecule: StatusIndicator
 * Combina Badge atom con lógica de mapeo de estados
 * Principios: Single Responsibility, Composition
 */
@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <app-badge [variant]="variant()" [text]="statusText()" />
  `,
})
export class StatusIndicatorComponent {
  // Angular 21 Signal Input
  status = input.required<'Alive' | 'Dead' | 'unknown'>();

  // Computed Signal para mapear status a variant
  variant = computed<'success' | 'danger' | 'warning'>(() => {
    const currentStatus = this.status();
    switch (currentStatus) {
      case 'Alive':
        return 'success';
      case 'Dead':
        return 'danger';
      case 'unknown':
      default:
        return 'warning';
    }
  });

  // Computed Signal para texto en español
  statusText = computed(() => {
    const currentStatus = this.status();
    switch (currentStatus) {
      case 'Alive':
        return 'Vivo';
      case 'Dead':
        return 'Muerto';
      case 'unknown':
      default:
        return 'Desconocido';
    }
  });
}
