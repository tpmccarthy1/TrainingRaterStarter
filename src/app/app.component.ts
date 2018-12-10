import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from './common/auth/auth.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { IUser } from './users/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  // Variable to store log-in state
  isLoggedIn: Observable<boolean>;
  isNavbarCollapsed = false;
  userData: Observable<IUser>;
  userName: string;

  constructor(
    private toastsManager: ToastsManager,
    vcr: ViewContainerRef,
    private authService: AuthService,
  ) {
     // sets the root view to be used with notifications
     this.toastsManager.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    // set isLoggedIn
    this.isLoggedIn = this.authService.isLoggedIn();

    // get user's name from authservice
    this.authService.getUserData()
       .subscribe((user) => user ? this.userName = user.firstName + '' + user.lastName : this.userName = '');
  }

  logout(): void {
    this.userName = '';
    this.authService.logout();
    this.toastsManager.success('Logged out!');
  }
}
