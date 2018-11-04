import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionsListComponent } from './sessions/sessions-list/sessions-list.component';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users-list/users.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sessions', component: SessionsListComponent },
  { path: 'users', component: UsersComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule { }
