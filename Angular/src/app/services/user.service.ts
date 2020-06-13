import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ) {
    this.url = Global.url;
  }

  test() {
    return 'Hola soy un servicio';
  }

  register(user): Observable<any> {
    const json = JSON.stringify(user);
    const params = 'json=' + json;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + '/register', params, {headers});
  }

  signup(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true';
    }
    const json = JSON.stringify(user);
    const params = 'json=' + json;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + '/login', params, {headers});

  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (identity && identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
