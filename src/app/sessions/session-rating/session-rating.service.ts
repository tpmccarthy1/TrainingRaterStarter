import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';


export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface ISessionRating {
    userId: number;
    sessionId: number;
    rating: RatingValue | number;
    createDate: Date;
}

@Injectable()
export class SessionRatingService {

    // Remove, this is only to simulate a db
    private ratings: ISessionRating[] = [];

    constructor(
        private http: HttpClient,
    ) { }

    getAvgRating(sessionId: number): Observable<number> {

        const ratings = this.ratings
            .filter(
                (ratingObj) => ratingObj.sessionId === sessionId,
            ).map(
                (ratingObj) => ratingObj.rating,
            );

        if (!this.ratings.length) {
            return Observable.of(null);
        }

        let sum = 0;
        ratings.forEach((rating: number) => sum += rating);
        const avg = sum / ratings.length;

        return Observable.of(avg);
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

    save(rating: ISessionRating): Observable<ISessionRating> {
        this.ratings.push(rating);
        return Observable.of(rating);
    }

}
