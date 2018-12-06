import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from './common/auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  // Variable to store log-in state
  isLoggedIn: Observable<boolean>;
  isNavbarCollapsed = false;
  userData: Object;
  userName;

  constructor(
    private toastsManager: ToastsManager,
    vcr: ViewContainerRef,
    public authService: AuthService,
  ) {
     // sets the root view to be used with notifications
     this.toastsManager.setRootViewContainerRef(vcr);
     // set isLoggedIn
     this.isLoggedIn = authService.isLoggedIn();
    }

  ngOnInit() {
    this.authService.getUserData()
        .subscribe((user) => user ? this.userName = user.firstName + '' + user.lastName : this.userName = '');
  }

  logout(): void {
    this.userName = '';
    this.authService.logout();
    this.toastsManager.success('Logged out!');
  }
}
