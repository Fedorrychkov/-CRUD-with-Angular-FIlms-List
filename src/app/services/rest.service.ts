import { Injectable } from '@angular/core';
import { Http,
         Headers,
         Response,
         RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import { Endpoint } from '../enums/endpoint.enum';
import { KeyVal, RequestParams } from '../interfaces/rest';

@Injectable()
export class RestService {
  public apiUrl: string;

  public serialize(obj, prefix?: any) {
    const str = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? prefix : p, v = obj[p];
            str.push(typeof v === 'object' ?
                                    this.serialize(v, k) :
                                    `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
    }
    return str.join('&');
}

  constructor(
    public http: Http
  ) {
    this.apiUrl = environment.apiUrl;
  }

  request<T>(params: RequestParams, endpoint: Endpoint): Promise<Response> {
    return new Promise<Response>((res, rej) => {
      this.http.request(params.url, {
        method: params.method,
        headers: params.headers,
        body: params.body,
      })
      .subscribe((data: Response) => {
        if (data.status === 204 && data.text() === '') {
          res();
        } else {
          try {
            if (data.text() !== 'OK') {
                if ( /^application\/vnd\./.test(data.headers.get('content-type')) ) {
                    res(data);
                } else {
                    res(JSON.parse(data.text()));
                }
              } else {
                  res();
              }
            } catch (e) {
              rej(e);
            }
          }
        }, (err) => {
          rej(err);
      });
    });
  }
  get<T>(endpoint: Endpoint, data?: any, headers?: KeyVal[]): Promise<any> {
    const reqParams = this.paramsByEndpoint(endpoint);
    if (headers) {
      headers.forEach((h) => {
        if (reqParams.headers.has(h.key)) {
          reqParams.headers.set(h.key, h.val);
        } else {
          reqParams.headers.append(h.key, h.val);
        }
      });
    }
    const results = [];
    const re = /{([^}]+)}/g;
    let text;

    while (text = re.exec(reqParams.url)) {
        results.push(text[1]);
    }

    for (let i = 0; i < results.length; i++) {
        if (data[results[i]]) {
            reqParams.url = reqParams.url.replace(`{${results[i]}}`, data[results[i]]);
        } else {
            reqParams.url = reqParams.url.replace(`/{${results[i]}}`, '');
        }
    }

    if (data) {
        results.forEach( (item) => {
            if (data.hasOwnProperty(item)) {
                delete data[item];
            }
        });

        this.paramsBody(reqParams, data);
    }

    return this.request<T>(reqParams, endpoint);
  }
  paramsBody( params: RequestParams, data: any ): RequestParams {
    if ( ['get', 'delete'].indexOf(params.method) !== -1 ) {
        const str = this.serialize(data);
        if (str) {
            params.url = `${params.url}?${str}`;
        }
    } else {
        params.body = JSON.stringify(data);
    }
    return params;
  }
  paramsByEndpoint( endpoint: Endpoint ): RequestParams {
    let params: RequestParams;
    const headers: Headers = new Headers();

    switch (endpoint) {
      case Endpoint.SEARCH:
        params = {
            url: '',
            method: 'get'
        };
        break;
      case Endpoint.GETBYID:
        params = {
          url: '',
          method: 'get'
        };
        break;
      default:
        break;
    }
    params.url = this.apiUrl + params.url;

    if ( ['post', 'put', 'patch'].indexOf(params.method) !== -1 ) {
        headers.append('Content-Type', 'application/json');
    }
    params.headers = headers;
    return params;
  }
}
