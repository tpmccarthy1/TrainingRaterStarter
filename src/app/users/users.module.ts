import { NgModule } from '@angular/core';
import { UsersComponent } from './users-list/users.component';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
      UsersComponent,
  ],
  imports: [
      CommonModule,
  ],
  providers: [
      UsersService,
  ],
  bootstrap: [
  ],
})
export class UsersModule { }
