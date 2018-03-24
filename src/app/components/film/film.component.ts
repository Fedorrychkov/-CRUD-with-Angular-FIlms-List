import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchFilmService } from './../../services/search-film.service';
import { IFilm } from '../../interfaces/IFilm';
import { IFilmShort } from '../../interfaces/IFilmShort';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  public id: string;
  public film: IFilm;
  public isLoading = true;

  constructor(
    public route: ActivatedRoute,
    public searchFilmService: SearchFilmService,
    public favoriteService: FavoriteService
  ) {
    this.route.params.subscribe(
      (params) => {
          this.id = params.id;
          this.loadFilm();
      }
    );
  }

  loadFilm() {
    this.searchFilmService.getFilmById(this.id)
      .then((data) => {
        this.film = data;
        console.log(data);
      })
      .then(() => {
        this.isLoading = true;
      });
  }

  addToFavorite(film: IFilmShort) {
    this.favoriteService.addToFavorite(film);
  }
  favoriteCheck(film: IFilmShort) {
    return this.favoriteService.checkFavorite(film);
  }

  ngOnInit() {
  }

}
