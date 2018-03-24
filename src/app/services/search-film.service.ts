import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Endpoint } from '../enums/endpoint.enum';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchFilmService {

    constructor(
        public restService: RestService
    ) {
    }
    searchFilms(query: string): Promise<any> {
        return new Promise( (res, rej) => {
        this.restService.get(Endpoint.SEARCH, {apikey: environment.apikey, s: query})
            .then(
                (data) => {
                    res(data);
                }, (err) => {
                    rej(err);
                }
            );
        });
    }
}
