import { Component, OnInit } from '@angular/core';
import { IFilmShort } from '../../interfaces/IFilmShort';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public filmsList: IFilmShort[];

  constructor(
    public favoriteService: FavoriteService
  ) { }

  addToFavorite(film: IFilmShort) {
    this.favoriteService.addToFavorite(film);
    this.getFavorites();
  }
  favoriteCheck(film: IFilmShort) {
    return this.favoriteService.checkFavorite(film);
  }
  getFavorites() {
    this.filmsList = localStorage.favorite ? JSON.parse(localStorage.favorite) : [];
  }
  ngOnInit() {
    this.getFavorites();
  }

}
