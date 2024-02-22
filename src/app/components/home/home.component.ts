import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    PokemonListComponent,
    HttpClientModule,
  ],
  providers: [PokeapiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Pokedex - Home';
}
