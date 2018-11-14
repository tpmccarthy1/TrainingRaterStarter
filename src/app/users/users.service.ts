import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface IUsers {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable()
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>('http://localhost:3000/users');
  }

}
