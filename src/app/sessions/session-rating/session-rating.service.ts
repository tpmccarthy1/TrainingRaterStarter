import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { SessionsService, ISession } from '../sessions.service';


export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface ISessionRating {
    userId: number;
    sessionId: number;
    rating: RatingValue | number;
}


@Injectable()
export class SessionRatingService {

    private ratings: ISessionRating[] = [];

    constructor(
        private http: HttpClient,
        private sessionService: SessionsService,
    ) { }

    hasBeenRatedByUser(userId: number, sessionId: number): Observable<boolean> {
        const hasBeenRated = this.ratings.some(
            (rating) => rating.userId === userId && rating.sessionId === sessionId
        );
        return Observable.of(hasBeenRated);
    }

    getAvgRating(sessionId: number): Observable<number> {
        let avgRating;
        this.sessionService.getSessionById(sessionId).subscribe((session) => {
            avgRating = session[0].avgRating;
            console.log(avgRating);
        });
        return Observable.of(avgRating);
    }

    getRatings (): Observable<ISessionRating[]> {
        this.ratings = [];
        this.sessionService.getSessions().subscribe((sessions) => {
            for ( let i = 0; i < sessions.length; i++ ) {
                for ( let y = 0; y < sessions[i].Ratings.length; y++ ) {
                    const rating = {
                        userId: sessions[i].Ratings[y].userId,
                        sessionId: sessions[i].Ratings[y].sessionId,
                        rating: sessions[i].Ratings[y].rating,
                    };
                    this.ratings.push(rating);
                    }
            }
        }
        );
        return Observable.of(this.ratings);
    }

    save(rating: ISessionRating, sessionId: number): Observable<ISessionRating | number[]> {
        if (sessionId) {
          return this.http.post<ISessionRating>(`http://localhost:3000/ratings/${sessionId}`, rating);
        } else {
            return this.http.post<ISessionRating>(`http://localhost:3000/ratings/`, rating);
        }
    }

}
