import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SessionRatingService, ISessionRating, RatingValue } from './session-rating.service';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../../common/auth/auth.service';
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
  ratingMode = true;
  userId: number;
  ratings: { value: RatingValue, name: string }[] = [
      { value: 1, name: '1 star' },
      { value: 2, name: '2 star' },
      { value: 3, name: '3 star' },
      { value: 4, name: '4 star' },
      { value: 5, name: '5 star' },
  ];


  constructor(
    private ratingService: SessionRatingService,
    private toastManager: ToastsManager,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.getUserData()
       .subscribe((user) => this.userId = user.id);
    this.ratingService.hasBeenRatedByUser(this.userId, this.sessionId)
      .subscribe((hasBeenRated) => this.hasBeenRatedByUser = hasBeenRated);
    this.getAvgRating();
  }

  // Get avg rating for each session

  stopTheClick(event: Event): void {
    event.stopPropagation();
  }

  getAvgRating(): void {
    this.ratingService.getAvgRating(this.sessionId).subscribe((data) => this.avgRating = data);
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
        this.ratingMode = false;
        this.hasBeenRatedByUser = true;
      });
  }

}
