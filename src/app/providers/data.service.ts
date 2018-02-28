import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    constructor(private http: Http) {
    }

    public getJSON(): Observable<any> {
         return this.http.get('src/mocks/data.json')
                .map((response: Response) => {
                    return response.json();
                }
                )
                .catch((error) => error);

     }
}
