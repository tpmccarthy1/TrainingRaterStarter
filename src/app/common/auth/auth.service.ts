import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../../users/users.service';
import 'rxjs/add/operator/do';


export interface ILoginResponse {
    success: boolean;
    token?: string;
    user?: IUser;
}

@Injectable()
export class AuthService {

  token: string = null;
  userData: IUser = null;

  // Behavior subject to track if user is logged in
  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  // Behavior subject for logged in user informatio
  userDataSubject = new BehaviorSubject<IUser>(this.userData);

  constructor(
    private http: HttpClient,
  ) { }


  isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  getUserData(): Observable<IUser> {
    return this.userDataSubject.asObservable();
  }

  // Return boolean of user log in state
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(email: string, password: string): Observable<ILoginResponse> {
      const data = {
          email: email,
          password: password,
      };
      return this.http.post<ILoginResponse>('http://localhost:3000/login', data)
        .do((response) => {
            this.userData = response.user;
            this.token = response && response.success && response.token || null;
            this.isLoginSubject.next(true);
            this.userDataSubject.next(this.userData);
        });
  }

  logout(): void {
    this.token = null;
    this.userData = null;
    this.isLoginSubject.next(false);
    console.log('logged out');
   }

}
