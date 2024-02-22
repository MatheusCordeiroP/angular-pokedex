import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() username: string = 'Matheus Cordeiro';
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
