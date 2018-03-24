import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule,
         MatToolbarModule,
         MatTabsModule,
         MatAutocompleteModule,
         MatFormFieldModule,
         MatInputModule,
         MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilmSearchComponent } from './components/film-search/film-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RestService } from './services/rest.service';
import { SearchFilmService } from './services/search-film.service';
import { FavoriteService } from './services/favorite.service';


@NgModule({
  declarations: [
    AppComponent,
    FilmSearchComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RestService,
    SearchFilmService,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
