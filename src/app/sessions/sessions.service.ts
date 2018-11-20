import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface ISession {
  id: number;
  name: string;
  location: string;
  startTime: Date | string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SessionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getSessions(): Observable<ISession[]> {
    return this.http.get<ISession[]>('http://localhost:3000/sessions');
  }

  getSessionById(id: number): Observable<ISession> {
    return this.http.get<ISession>(`http://localhost:3000/sessions/${id}`);
  }

  createSession(session: ISession): Observable<ISession> {
    return this.http.post<ISession>('http://localhost:3000/sessions', session);
  }

  updateSession(session: ISession): Observable<ISession> {
    return this.http.put<ISession>('http://localhost:3000/sessions', session);
  }

}
