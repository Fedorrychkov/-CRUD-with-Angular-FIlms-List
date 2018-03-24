import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { SearchFilmService } from '../../services/search-film.service';
import { map } from 'rxjs/operators/map';
import { IFilmShort } from '../../interfaces/IFilmShort';

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
    public searchFilmsService: SearchFilmService
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
        console.log(this.filmsList);
      });
  }

  addToFavorite(film: IFilmShort) {
    console.log(film);
    // TODO: favorite add method
  }
  favoriteCheck(film: IFilmShort) {
    return true;
    // TODO: favorite check method
  }

  ngOnInit() {
    this.SearchForm = this.fb.group({
      filmTitle: [this.filmTitle]
    });
  }
}
