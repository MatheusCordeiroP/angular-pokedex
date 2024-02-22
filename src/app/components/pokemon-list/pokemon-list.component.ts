import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PokemonItemComponent,
  ],
  providers: [PokeapiService],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokeapiService: PokeapiService;
  router: Router;
  @ViewChild('mainContainer') mainContainer!: ElementRef;

  selectedPage: number = 1;
  totalPages: number = 1;

  apiOffset = 0;
  apiLimit = 20;
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<any> = [];

  searchText = '';
  pokemonDetails: any = {};

  constructor(pokeapiService: PokeapiService, router: Router) {
    this.pokeapiService = pokeapiService;
    this.router = router;

    pokeapiService.fetchPokemon(this.apiLimit, this.apiOffset);

    pokeapiService.pokemonData.subscribe((value) => {
      this.selectedPage = Math.ceil(value.apiOffset / value.apiLimit) + 1;
      this.totalPages = Math.ceil(value.pokemonCount / value.apiLimit);

      this.apiOffset = value.apiOffset;
      this.apiLimit = value.apiLimit;
      this.isLoading = value.isLoading;
      this.pokemonCount = value.pokemonCount;
      this.pokemonList = value.pokemonList;
    });

    pokeapiService.pokemonDetailSubject.subscribe((value) => {
      this.pokemonDetails = value.pokemonDetails;
      this.onPokemonDetailsChanged();
    });
  }

  changePage(direction: 'first' | 'previous' | 'next' | 'last') {
    switch (direction) {
      case 'first':
        this.pokeapiService.fetchPokemon(this.apiLimit, 0);
        break;
      case 'previous':
        this.apiOffset =
          this.apiOffset > this.apiLimit ? this.apiOffset - this.apiLimit : 0;
        this.pokeapiService.fetchPokemon(this.apiLimit, this.apiOffset);
        break;
      case 'next':
        this.apiOffset =
          this.apiOffset + this.apiLimit > this.pokemonCount
            ? this.apiOffset
            : this.apiOffset + this.apiLimit;
        this.pokeapiService.fetchPokemon(this.apiLimit, this.apiOffset);
        break;
      case 'last':
        if (this.totalPages > 0) {
          this.pokeapiService.fetchPokemon(
            this.apiLimit,
            (this.totalPages - 1) * this.apiLimit
          );
        }
        break;
      default:
        this.pokeapiService.fetchPokemon(this.apiLimit, 0);
        break;
    }
    this.scrollToTop();
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchText.trim() !== '') {
      this.searchPokemon();
    }
  }

  async searchPokemon() {
    if (this.searchText.trim() === '') {
      return;
    }
    this.pokeapiService.getPokemonDetails(this.searchText.toLowerCase());
  }

  onPokemonDetailsChanged() {
    if (this.pokemonDetails && this.pokemonDetails.id) {
      this.router.navigate(['/details', this.pokemonDetails.id], {
        state: {
          pokemonDetails: this.pokemonDetails,
        },
      });
    }
  }

  scrollToTop(): void {
    this.mainContainer.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
