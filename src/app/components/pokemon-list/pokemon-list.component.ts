import { Component } from '@angular/core';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonItemComponent],
  providers: [PokeapiService],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokeapiService: PokeapiService;

  selectedPage: number = 1;
  totalPages: number = 1;

  apiOffset = 0;
  apiLimit = 20;
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<any> = [];

  constructor(pokeapiService: PokeapiService) {
    this.pokeapiService = pokeapiService;

    pokeapiService.pokemonData.subscribe((value) => {
      this.selectedPage = Math.ceil(value.apiOffset / value.apiLimit) + 1;
      this.totalPages = Math.ceil(value.pokemonCount / value.apiLimit);

      this.apiOffset = value.apiOffset;
      this.apiLimit = value.apiLimit;
      this.isLoading = value.isLoading;
      this.pokemonCount = value.pokemonCount;
      this.pokemonList = value.pokemonList;
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
  }
}
