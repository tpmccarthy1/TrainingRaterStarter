import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from './common/auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  // Variable to store log-in state
  isLoggedIn: Observable<boolean>;
  isNavbarCollapsed = false;

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
  user = this.authService.user ? this.user.authService.user : 'home';
  logout(): void {
    this.authService.logout();
    this.toastsManager.success('Logged out!');
  }
}
