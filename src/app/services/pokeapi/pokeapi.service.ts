import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, onErrorResumeNext } from 'rxjs';
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

  pokemonDetails: any = {};

  pokemonData: Subject<PokemonData> = new Subject<PokemonData>();
  pokemonDetailSubject: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  async fetchPokemon(limit: number = 20, offset: number = 0) {
    this.httpClient
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .subscribe((value: any) => {
        this.pokemonData.next({
          apiOffset: offset ? offset : this.apiOffset,
          apiLimit: limit ? limit : this.apiLimit,
          isLoading: false,
          pokemonCount: value.count ? value.count : this.pokemonCount,
          pokemonList: value.results ? value.results : this.pokemonList,
        });
      });
  }

  async getPokemonDetails(search: string) {
    await this.httpClient
      .get(`https://pokeapi.co/api/v2/pokemon/${search}/`)
      .pipe(
        catchError((error) => {
          return onErrorResumeNext(error);
        })
      )
      .subscribe((value: any) => {
        this.pokemonDetailSubject.next({
          pokemonDetails: value,
        });
        return value;
      });
    return this.pokemonDetails;
  }
}
