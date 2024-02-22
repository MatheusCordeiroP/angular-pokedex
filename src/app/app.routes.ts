import { Routes } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
