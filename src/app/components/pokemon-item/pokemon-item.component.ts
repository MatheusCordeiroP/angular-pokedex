import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  formatName(name: string): string {
    if (!name) return '';

    const cleanUrl = this.pokemon.url.match(/\/(\d+)\/$/);
    const pokemonNumber: string = cleanUrl != null ? cleanUrl[1] : '0';

    return name.charAt(0).toUpperCase() + name.slice(1) + ` #${pokemonNumber}`;
  }

  getPokemonImage(shinyVersion: boolean = false) {
    const cleanUrl = this.pokemon.url.match(/\/(\d+)\/$/);
    const pokemonNumber: string = cleanUrl != null ? cleanUrl[1] : '0';

    if (shinyVersion) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonNumber}.png`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  }

  goToDetails() {
    const cleanUrl = this.pokemon.url.match(/\/(\d+)\/$/);
    const pokemonNumber: string = cleanUrl != null ? cleanUrl[1] : '0';

    this.router.navigate(['/details', pokemonNumber], {});
  }
}
