import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmSearchComponent } from './components/film-search/film-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FilmComponent } from './components/film/film.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: 'films', pathMatch: 'full' },
        { path: 'films', component: FilmSearchComponent },
        { path: 'films/:id', component: FilmComponent },
        { path: 'favorites', component: FavoritesComponent },
        { path: 'favorites/:id', component: FilmComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
