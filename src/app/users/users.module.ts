import { NgModule } from '@angular/core';
import { UsersComponent } from './users-list/users.component';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      UsersComponent,
      UserDetailComponent
  ],
  imports: [
      CommonModule,
      FormsModule
  ],
  providers: [
      UsersService,
  ],
  bootstrap: [
  ],
})
export class UsersModule { }
