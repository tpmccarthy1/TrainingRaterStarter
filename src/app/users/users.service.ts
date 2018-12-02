import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  phone: string;
  isTrainer: boolean;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:3000/users/${id}`);
  }

  save(user: IUser): Observable<IUser | number[]> {
    if (user.id) {
      return this.http.put<number[]>('http://localhost:3000/users', user);
    } else {
      return this.http.post<IUser>('http://localhost:3000/users', user);
    }
  }

  delete(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`http://localhost:3000/users/${id}`);
  }
}
