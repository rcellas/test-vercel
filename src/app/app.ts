import { Component } from '@angular/core';
import { CharacterListPageComponent } from './features/characters/pages/character-list-page/character-list-page.component';

/**
 * Componente raíz de la aplicación
 * Angular 21: Standalone component sin NgModule
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterListPageComponent],
  template: `
    <app-character-list-page />
  `,
})
export class App {}
