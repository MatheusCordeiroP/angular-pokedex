import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type PokemonData = {
  isLoading: boolean;
  pokemonCount: number;
  pokemonList: Array<any>;
  previousPage: null | string;
  nextPage: null | string;
};

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<any> = [];
  previousPage: null | string = null;
  nextPage: null | string = null;

  pokemonData: Subject<PokemonData> = new Subject<PokemonData>();

  constructor(private httpClient: HttpClient) {
    this.fetchPokemon();
  }

  async fetchPokemon() {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?offset=60&limit=20')
      .subscribe((value: any) => {
        this.updateVariables({
          isLoading: false,
          pokemonCount: value.count,
          pokemonList: value.results,
          previousPage: value.previous,
          nextPage: value.next,
        });
      });
  }

  updateVariables(pokemonData: PokemonData) {
    this.pokemonData.next({
      isLoading: false,
      pokemonCount: pokemonData.pokemonCount,
      pokemonList: pokemonData.pokemonList,
      previousPage: pokemonData.previousPage,
      nextPage: pokemonData.nextPage,
    });
  }
}
