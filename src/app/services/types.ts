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

export type TypeColor =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type PokemonStats =
  | 'hp'
  | 'defense'
  | 'special-defense'
  | 'attack'
  | 'special-attack'
  | 'speed'
  | 'total';
