import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private navLinks = [
    {
      path: 'films',
      label: 'Найти фильм'
    },
    {
      path: 'favorites',
      label: 'Избранные фильмы'
    }
  ];
}
