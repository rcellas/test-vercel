import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.interface';
import { CharacterGridComponent } from '../../components/character-grid/character-grid.component';
import { SpinnerComponent } from '../../../../shared/atoms/spinner/spinner.component';
import { ErrorMessageComponent } from '../../../../shared/organisms/error-message/error-message.component';

/**
 * Componente Page: CharacterListPage
 * Página principal que orquesta la carga y visualización de personajes
 * Principios: Single Responsibility, Dependency Inversion
 * Angular 21: Signals para estado reactivo, inject() para DI
 */
@Component({
  selector: 'app-character-list-page',
  standalone: true,
  imports: [
    CommonModule,
    CharacterGridComponent,
    SpinnerComponent,
    ErrorMessageComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <header class="mb-8 text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Rick and Morty
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Explora el multiverso de personajes
          </p>
        </header>

        <!-- Loading State -->
        @if (loading()) {
          <div class="flex justify-center py-20">
            <app-spinner size="lg" />
          </div>
        }

        <!-- Error State -->
        @else if (error()) {
          <div class="max-w-2xl mx-auto">
            <app-error-message
              [message]="error()!"
              (retry)="loadCharacters()"
            />
          </div>
        }

        <!-- Success State -->
        @else {
          <app-character-grid
            [characters]="characters()"
            (characterSelect)="onCharacterSelect($event)"
          />
        }
      </div>
    </div>
  `,
})
export class CharacterListPageComponent implements OnInit {
  // Angular 21: inject() function para DI
  private readonly characterService = inject(CharacterService);

  // Angular 21: Signals para estado reactivo
  loading = signal(false);
  error = signal<string | null>(null);
  characters = signal<Character[]>([]);

  ngOnInit(): void {
    this.loadCharacters();
  }

  /**
   * Carga la lista de personajes desde la API
   */
  loadCharacters(): void {
    this.loading.set(true);
    this.error.set(null);

    this.characterService.getCharacters().subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading characters:', err);
        this.error.set(
          'No se pudieron cargar los personajes. Por favor, intenta de nuevo.'
        );
        this.loading.set(false);
      },
    });
  }

  /**
   * Maneja la selección de un personaje
   * @param character Personaje seleccionado
   */
  onCharacterSelect(character: Character): void {
    console.log('Personaje seleccionado:', character);
    // Aquí se podría navegar a una página de detalle
  }
}
