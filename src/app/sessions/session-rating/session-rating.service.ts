import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { SessionsService } from '../sessions.service';


export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface ISessionRating {
    userId: number;
    sessionId: number;
    rating: RatingValue | number;
}

@Injectable()
export class SessionRatingService {

    private avgRating = 0;
    private ratings: ISessionRating[] = [];

    constructor(
        private http: HttpClient,
        private sessionService: SessionsService,
    ) { }

    getAvgRating(sessionId: number): Observable<number> {
        this.sessionService.getSessions()
        .subscribe(
          (sessions) => {
           for (let i = 0; i < sessions.length; i++) {
               if (sessions[i].id === sessionId)  {
                   this.avgRating = sessions[i].avgRating;
                   break;
               }
            }
          });

        return Observable.of(this.avgRating);
    }

    hasBeenRatedByUser(userId: number, sessionId: number): Observable<boolean> {
        const hasBeenRated = this.ratings.some(
            (rating) => rating.userId === userId && rating.sessionId === sessionId
        );
        return Observable.of(hasBeenRated);
    }

    getRatings(sessionId: number): Observable<ISessionRating[]> {
        const ratings = this.ratings
            .filter(
                (rating) => rating.sessionId === sessionId,
            );
        return Observable.of(ratings);
    }

    save(rating: ISessionRating, sessionId: number): Observable<ISessionRating | number[]> {
        if (sessionId) {
          return this.http.put<ISessionRating>(`http://localhost:3000/rating/${sessionId}`, rating);
        } else {
            return this.http.post<ISessionRating>(`http://localhost:3000/rating/`, rating);
        }
    }

}
