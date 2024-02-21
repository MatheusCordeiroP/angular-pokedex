import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PokemonList, PokemonData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  apiOffset = 0;
  apiLimit = 20;
  isLoading = true;
  pokemonCount: number = 0;
  pokemonList: Array<PokemonList> = [];

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
