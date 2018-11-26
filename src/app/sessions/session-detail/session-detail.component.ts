import { Component, OnInit } from '@angular/core';
import { SessionsService, ISession } from '../sessions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './session-detail.component.html',
})

export class SessionsDetailComponent implements OnInit {

  session: ISession;

  constructor(
      private sessionsService: SessionsService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
      let id: string | number = this.route.snapshot.paramMap.get('sessionId');

      id = isNaN(parseInt(id, 0)) ? 0 : parseInt(id, 0);

      if (id > 0) {
        this.sessionsService.getSessionById(id)
        .subscribe(
          (session) => {
              const startTime = new Date(session.startTime);
              session.startTime = startTime.toISOString().slice(0, 16);
              this.session = session;
        });
      } else {
        // new session
        this.session = {
          id: 0,
          name: '',
          location: '',
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
        console.log('form not valid');
      return;
    }

    this.sessionsService.save(this.session)
      .subscribe((session) => {
        this.router.navigate(['sessions']);
      });

  }

  cancel(): void {
    this.router.navigate(['sessions']);
  }

}
