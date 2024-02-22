import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { PokeapiService } from './services/pokeapi/pokeapi.service';
import { DetailsComponent } from './components/details/details.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    PokemonListComponent,
    DetailsComponent,
    HttpClientModule,
  ],
  providers: [PokeapiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-pokedex';
}
