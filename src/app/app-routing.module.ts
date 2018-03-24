import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmSearchComponent } from './components/film-search/film-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
    { path: '', children: [
        { path: '', redirectTo: 'films', pathMatch: 'full' },
        { path: 'films', component: FilmSearchComponent },
        { path: 'favorites', component: FavoritesComponent }
    ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
