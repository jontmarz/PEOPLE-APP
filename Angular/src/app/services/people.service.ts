import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from '../models/people';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  public url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = Global.url;
  }

  test() {
    return 'este es el servicio de people';
  }

  getPerson(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x/www/form/urlencoded');

    return this._http.get(this.url + '/people', {headers});
  }

  create(token, people): Observable<any> {
    const json = JSON.stringify(people);
    const params = 'json=' + json;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.post(this.url + '/people', params, {headers});
  }


  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x/www/form/urlencoded')
                                     .set('Authorization', token);

    return this._http.delete(this.url + '/people/' + id, {headers});
  }
}
