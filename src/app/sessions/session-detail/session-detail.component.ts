import { Component, OnInit } from '@angular/core';
import { SessionsService, ISession } from '../sessions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  templateUrl: './session-detail.component.html',
})

export class SessionsDetailComponent implements OnInit {

  session: ISession;
  newSession: boolean;

  constructor(
      private sessionsService: SessionsService,
      private route: ActivatedRoute,
      private router: Router,
      private toastsManager: ToastsManager,
  ) { }

  ngOnInit() {
      // Variable for sessionId parameter
      const sessionId = this.route.snapshot.paramMap.get('sessionId');

      // Set newSession flag to false to show delete if not new session
      this.newSession = sessionId === 'add' ? false : true;

      let id: string | number = sessionId;

      id = isNaN(parseInt(id, 0)) ? 0 : parseInt(id, 0);

      if (id > 0) {
        this.sessionsService.getSessionById(id)
        .subscribe(
          (session) => {
              this.session = session;
        });
      } else {
        // new session
        this.session = {
          id: 0,
          name: '',
          location: '',
          avgRating: 0,
          Ratings: [],
          startTime: this.getLocalDateTime(),
          createdAt: this.getLocalDateTime(),
          updatedAt: this.getLocalDateTime(),
        };
      }
  }

  getLocalDateTime(): string {
    const startTime = new Date();
    startTime.setHours(startTime.getHours() - (startTime.getTimezoneOffset() / 60));
    return startTime.toISOString().slice(0, 16);
  }

  private formValid(): boolean {
    return this.session.name && this.session.location ? true : false;
  }

  save(): void {
    if (!this.formValid() ) {
      this.toastsManager.error('Form Invalid');
      return;
    }

    this.sessionsService.save(this.session)
      .subscribe((session) => {
        this.toastsManager.success('Session saved');
        this.router.navigate(['sessions']);
      });

  }

  cancel(): void {
    this.router.navigate(['sessions']);
  }

  delete(): void {
    this.sessionsService.delete(this.session.id)
      .subscribe((session) => {
        this.router.navigate(['sessions']);
      });
  }

}
