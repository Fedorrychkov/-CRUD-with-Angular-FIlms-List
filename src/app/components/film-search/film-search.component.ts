import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchFilmService } from '../../services/search-film.service';
import { map } from 'rxjs/operators/map';
import { IFilmShort } from '../../interfaces/IFilmShort';
import { FavoriteService } from './../../services/favorite.service';

@Component({
  selector: 'app-film-search',
  templateUrl: './film-search.component.html',
  styleUrls: ['./film-search.component.scss']
})
export class FilmSearchComponent implements OnInit {
  public SearchForm: any;
  public filmTitle: FormControl = new FormControl();
  public filmTitlesList: String[] = [];
  public filmsList: IFilmShort[];
  public isLoading = true;

  constructor(
    public fb: FormBuilder,
    public searchFilmsService: SearchFilmService,
    public favoriteService: FavoriteService
  ) { }

  getTitlesForAutoComplete() {
    const filmTitle = this.SearchForm.get('filmTitle');
    const query = filmTitle.value.value;
    this.searchFilmsService.searchFilms(query)
      .then((data) => {
        if (data.Response === 'True') {
          this.filmTitlesList = data.Search.map(item => item.Title);
        } else {
          this.filmTitlesList = [];
          this.filmTitlesList.splice(
            0,
            this.filmTitlesList.length,
            data.Error.search(/not found/i) !== -1 ? 'Фильмов не найдено' : 'Продолжайте набирать'
          );
        }
      });
  }

  findFilm(e) {
    this.isLoading = false;
    this.searchFilmsService.searchFilms(e.filmTitle.value)
      .then((data) => {
        if (data.Response === 'True') {
          this.filmsList = data.Search;
        } else {
          this.filmsList = [];
        }
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
    this.SearchForm = this.fb.group({
      filmTitle: [this.filmTitle]
    });
  }
}
