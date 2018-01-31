import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as M from '../../app.models';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NetService {
    private apiUrl = 'http://localhost:3000/books';

    constructor(private http: HttpClient) { }

    private getHeaders(contentType: string = 'application/json'): HttpHeaders {
        const headers = new HttpHeaders().set('Content-Type', contentType);
        return headers;
    }

    getAllBooks(): Observable<M.Book[]> {
        return this.http.get<M.Book[]>(this.apiUrl);
    }
}
