import { ActivatedRouteSnapshot, RouterStateSnapshot,Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AuthService} from './auth.service';
import { ToastsManager } from 'ng2-toastr';


@Injectable()
export class AuthGuard implements CanActivate {

  // Variable for storing the users target route before hitting login page
  targetRoute: string;

  constructor(
      private authService: AuthService,
      private router: Router,
      private toastsManager: ToastsManager,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> {
    this.targetRoute = state.url;
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
        this.toastsManager.error('Please login');
        this.router.navigate(['login']);
    }
    return Observable.of(isAuthenticated);
  }
}
