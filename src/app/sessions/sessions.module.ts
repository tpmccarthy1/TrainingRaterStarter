import { NgModule } from '@angular/core';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { SessionsService } from './sessions.service';
import { CommonModule } from '@angular/common';
import { SessionsDetailComponent } from './session-detail/session-detail.component';
import { FormsModule } from '@angular/forms';
import { SessionRatingComponent } from './session-rating/session-rating.component';
import { SessionRatingService } from './session-rating/session-rating.service';

@NgModule({
  declarations: [
      SessionsListComponent,
      SessionsDetailComponent,
      SessionRatingComponent,
  ],
  imports: [
      CommonModule,
      FormsModule
  ],
  providers: [
      SessionsService,
      SessionRatingService,
  ],
  bootstrap: [
  ],
})
export class SessionsModule { }
