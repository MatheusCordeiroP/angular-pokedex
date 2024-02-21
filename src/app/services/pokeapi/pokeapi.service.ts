import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type PokemonList = {
  name: string;
  url: string;
};

type PokemonData = {
  apiOffset: number;
  apiLimit: number;
  isLoading: boolean;
  pokemonCount: number;
  pokemonList: Array<PokemonList>;
};

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  apiOffset = 0;
  apiLimit = 20;
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<any> = [];

  pokemonData: Subject<PokemonData> = new Subject<PokemonData>();

  constructor(private httpClient: HttpClient) {
    this.fetchPokemon();
  }

  async fetchPokemon(limit: number = 20, offset: number = 0) {
    this.httpClient
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .subscribe((value: any) => {
        this.pokemonData.next({
          apiOffset: offset,
          apiLimit: limit,
          isLoading: false,
          pokemonCount: value.count,
          pokemonList: value.results,
        });
      });
  }
}
