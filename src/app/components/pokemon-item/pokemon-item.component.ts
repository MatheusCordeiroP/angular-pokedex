import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css',
})
export class PokemonItemComponent {
  @Input() pokemon: {
    name: string;
    url: string;
  } = { name: '', url: '' };

  formatName(name: string): string {
    if (!name) return '';

    const cleanUrl = this.pokemon.url.match(/\/(\d+)\/$/);
    const pokemonNumber: string = cleanUrl != null ? cleanUrl[1] : '0';

    return name.charAt(0).toUpperCase() + name.slice(1) + ` #${pokemonNumber}`;
  }

  getPokemonImage() {
    const cleanUrl = this.pokemon.url.match(/\/(\d+)\/$/);
    const pokemonNumber: string = cleanUrl != null ? cleanUrl[1] : '0';

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  }
}
