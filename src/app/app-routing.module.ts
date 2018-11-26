import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionsListComponent } from './sessions/sessions-list/sessions-list.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users-list/users.component';
import { SessionsDetailComponent } from './sessions/session-detail/session-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sessions', component: SessionsListComponent },
  { path: 'users', component: UsersComponent},
  { path: 'sessions/:sessionId', component: SessionsDetailComponent},
  { path: 'users/:userId', component: UserDetailComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})

export class AppRoutingModule { }
