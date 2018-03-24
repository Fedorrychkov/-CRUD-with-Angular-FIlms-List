import { Headers } from '@angular/http';

export interface KeyVal {
    key: string;
    val: string;
}

export interface RequestParams {
    url: string;
    method: string;
    headers?: Headers;
    body?: any;
}
