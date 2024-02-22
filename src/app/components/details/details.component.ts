import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TYPE_COLOR, STATS_NAMES } from '../../services/const';
import { PokemonStats, TypeColor } from '../../services/types';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  pokeapiService: PokeapiService;
  route: ActivatedRoute;
  router: Router;

  pokemonName: string = '';
  pokemonStats: Array<any> = [];
  pokemonTypes: Array<any> = [];
  pokemonId: number = 0;
  pokemonImageUrl: string = '';

  pokemonDetails: any = {};

  constructor(
    pokeapiService: PokeapiService,
    route: ActivatedRoute,
    router: Router
  ) {
    this.pokeapiService = pokeapiService;
    this.route = route;
    this.router = router;

    pokeapiService.pokemonDetailSubject.subscribe((value) => {
      this.pokemonDetails = value.pokemonDetails;
      this.pokemonName = this.pokemonDetails.name;
      this.pokemonStats = this.pokemonDetails.stats;
      this.pokemonTypes = this.pokemonDetails.types;
      this.pokemonId = this.pokemonDetails.id;
    });

    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.pokeapiService.getPokemonDetails(itemId);
    });
  }

  formatName(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getPokemonImage(shinyVersion: boolean = false) {
    const pokemonNumber: string =
      this.pokemonId != null ? this.pokemonId.toString() : '0';

    if (shinyVersion) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonNumber}.png`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  }

  getPokemonStatsName(stat: PokemonStats): string {
    return STATS_NAMES[stat];
  }

  getTypeColor(type: TypeColor) {
    return TYPE_COLOR[type];
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
