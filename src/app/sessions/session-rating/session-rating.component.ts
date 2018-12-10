import { Component, OnInit, Input } from '@angular/core';
import { SessionRatingService, ISessionRating, RatingValue } from './session-rating.service';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../../common/auth/auth.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-rating',
  templateUrl: './session-rating.component.html',
})

export class SessionRatingComponent implements OnInit {

  @Input() sessionId: number;

  hasBeenRatedByUser: boolean;
  avgRating: number;
  selectedRating: RatingValue;
  ratingMode = false;
  ratings: {value: RatingValue, name: string}[] = [
    {value: 1, name: '1 star'},
    {value: 2, name: '2 star'},
    {value: 3, name: '3 star'},
    {value: 4, name: '4 star'},
    {value: 5, name: '5 star'},
  ];
  userId: number;

  constructor(
    private ratingService: SessionRatingService,
    private toastManager: ToastsManager,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.getAvgRating();
    this.ratingService.hasBeenRatedByUser(1, this.sessionId)
      .subscribe((hasBeenRated) => this.hasBeenRatedByUser = hasBeenRated);
    this.authService.getUserData()
       .subscribe((user) => this.userId = user.id) ;
  }

  getAvgRating(): void {
    this.ratingService.getAvgRating(this.sessionId)
      .subscribe((avgRating) => this.avgRating = avgRating);
  }

  stopTheClick(event: Event): void {
    event.stopPropagation();
  }

  submit(): void {
    const rating: ISessionRating = {
      sessionId: this.sessionId,
      userId: this.userId,
      rating: this.selectedRating,
    };

    this.ratingService.save(rating, this.sessionId)
      .subscribe(() => {
        this.toastManager.success('Rating submitted');
        this.getAvgRating();
        this.ratingMode = false;
        this.hasBeenRatedByUser = true;
      });
  }

}
