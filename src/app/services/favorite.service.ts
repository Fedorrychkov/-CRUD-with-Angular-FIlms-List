import { Injectable } from '@angular/core';
import { IFilmShort } from '../interfaces/IFilmShort';

@Injectable()
export class FavoriteService {
  public favoriteList: IFilmShort[];

  constructor() { }

  addToFavorite(film: IFilmShort) {
    const favoriteList: IFilmShort[] = localStorage.favorite ? JSON.parse(localStorage.favorite) : [];
    let list: IFilmShort[];
    list = favoriteList.filter(item => item.imdbID !== film.imdbID );
    if (!this.checkFavorite(film)) {
      list.push(film);
    }
    this.favoriteList = list;
    localStorage.favorite = JSON.stringify(this.favoriteList);
  }

  checkFavorite(film: IFilmShort) {
    const favoriteList: IFilmShort[] = localStorage.favorite ? JSON.parse(localStorage.favorite) : [];
    let isFavorite = false;
    favoriteList.forEach(item => {
      if (item.imdbID === film.imdbID) {
        isFavorite = true;
      }
    });
    return isFavorite;
  }
}
