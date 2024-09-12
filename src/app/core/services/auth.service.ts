import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import CONSTANTS from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginRedirectUrl: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const URL = `${CONSTANTS.API_URL}/auth/login`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(URL, body, { headers }).pipe(
      map((response) => {
        if (response && response.access) {
          const loggedUser = {
            username,
            token: response.access,
            refresh_token: response.refresh
          }          
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }
        return response;
      }),
      catchError((error) => {
        console.log(error);
        throw new Error(error.error.detail)
      })
    );
  }

  signup(username: string, password: string, email: string):Observable<any>{
    const URL = `${CONSTANTS.API_URL}/auth/signup`;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password, email };

    return this.http.post<any>(URL, body, { headers });
  }

  logout(): void {
    window.localStorage.removeItem('loggedUser');
  }

  get isLoggedIn(): boolean {
    return !!this.loggedUser();
  }

  loggedUser(): any {
    const loggedUserItem = localStorage.getItem('loggedUser');
    if (loggedUserItem){
      return JSON.parse(loggedUserItem);
    } 
    else {
      return null;     
    }    
  } 
}
