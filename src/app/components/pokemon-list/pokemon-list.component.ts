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
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<any> = [];
  previousPage: string | null = null;
  nextPage: string | null = null;

  constructor(pokeapiService: PokeapiService) {
    pokeapiService.pokemonData.subscribe((value) => {
      this.isLoading = value.isLoading;
      this.pokemonCount = value.pokemonCount;
      this.pokemonList = value.pokemonList;
      this.previousPage = value.previousPage;
      this.nextPage = value.nextPage;
    });
  }
}
