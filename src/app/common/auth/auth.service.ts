import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

export interface ILoginResponse {
    success: boolean;
    token?: string;
    user?: Object;
}

@Injectable()
export class AuthService {

  // Behavior subject to track if user is logged in
  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  token: string = null;
  user: Object = null;

  // Return boolean of user log in state
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) { }


  isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  login(email: string, password: string): Observable<ILoginResponse> {
      const data = {
          email: email,
          password: password,
      };
      return this.http.post<ILoginResponse>('http://localhost:3000/login', data)
        .do((response) => {
            this.token = response && response.success && response.token || null;
            this.isLoginSubject.next(true);
        });
  }

  logout(): void {
    this.token = null;
    this.isLoginSubject.next(false);
    console.log('logged out');
   }

}
