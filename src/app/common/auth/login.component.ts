import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    email = '';
    password = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private toastsManager: ToastsManager,
        private authService: AuthService,
        private authGuard: AuthGuard,
    ) { }


  ngOnInit() {
  }

    login(): void {
        // Variable to store target route from AuthGuard
        const target = this.authGuard.targetRoute ? this.authGuard.targetRoute : 'home';

        this.authService.login(this.email, this.password)
            .subscribe(
                (response) => {
                    if (response.success) {
                        this.toastsManager.success('Logged in!');
                        this.router.navigate([target]);
                    } else {
                        this.toastsManager.error('Email or Password is incorrect');
                    }
                },
                (error) => {
                    this.toastsManager.error('Email or Password is inccorect.');
                }
            );
    }
}
