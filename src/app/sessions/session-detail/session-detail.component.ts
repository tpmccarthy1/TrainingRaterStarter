import { Component, OnInit } from '@angular/core';
import { SessionsService, ISession } from '../sessions.service';
import { ActivatedRoute, Router } from '@angular/router';

const defaultSession: ISession = {
      id: 0,
      name: '',
      location: '',
      startTime: new Date(),
      createdAt: null,
      updatedAt: null
};

@Component({
  templateUrl: './session-detail.component.html',
})

export class SessionsDetailComponent implements OnInit {

  session: ISession = { ...defaultSession };
  startTimeAsString = defaultSession.startTime;

  constructor(
      private sessionsService: SessionsService,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
      const idAsString = this.route.snapshot.paramMap.get('entityId');
      const id = isNaN(parseInt(idAsString, 0)) ? 0 : parseInt(idAsString, 0);
      if (id) {
        this.sessionsService.getSessionById(id)
        .subscribe(
          (session) => {
              console.log(this.session);
              this.session = session;
          },
          (error) => {
            this.router.navigate(['sessions']);
            console.log('error');
          },
        );
      }
  }

  private formValid(): boolean {
    if (this.session.name.trim() && this.session.location) {
      return true;
    }
    return false;
  }

  submit(): void {
    if (!this.formValid() ) {
        console.log('form not valid');
      // TODO: Add not valid message here
      return;
    }

    const session = {...this.session};

    if (session.id) {
      this.sessionsService.updateSession(session)
          .subscribe(() => {
              this.router.navigate(['sessions']);
          });
    } else {
      this.sessionsService.createSession(session)
          .subscribe(() => {
              this.router.navigate(['sessions']);
          });
  }
    // This is what we want to do on success, put on success side for end points
    this.router.navigate(['sessions']);
    console.log(this.startTimeAsString);
    this.session.startTime = this.startTimeAsString;
  }

}
