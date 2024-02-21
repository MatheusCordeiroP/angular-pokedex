export type PokemonList = {
  name: string;
  url: string;
};

export type PokemonData = {
  apiOffset: number;
  apiLimit: number;
  isLoading: boolean;
  pokemonCount: number;
  pokemonList: Array<PokemonList>;
};
