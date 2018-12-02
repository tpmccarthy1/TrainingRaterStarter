import { Component, OnInit } from '@angular/core';
import { UsersService, IUser } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  templateUrl: './user-detail.component.html',
})

export class UserDetailComponent implements OnInit {

  user: IUser;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastManager: ToastsManager,
  ) { }

  ngOnInit() {

    let id: string | number = this.route.snapshot.paramMap.get('userId');
    id = isNaN(parseInt(id, 0)) ? 0 : parseInt(id, 0);
    if (id > 0) {
      this.usersService.getUserById(id)
      .subscribe(
        (user) => {
            this.user = user;
        });
    } else {
        // new user
        this.user = {
            id: 0,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: new Date(),
            phone: '',
            isTrainer: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
  }

  private formValid(): boolean {
    const reqFields = [
                    this.user.email,
                    this.user.firstName,
                    this.user.lastName,
                    this.user.password,
                    this.user.isTrainer
                ];

    return reqFields.every((element =>  element !== '')) ? true : false;
  }

  save(): void {
    if (!this.formValid() ) {
      this.toastManager.error('There is a problem with your form.');
      return;
    }

    this.usersService.save(this.user)
      .subscribe((user) => {
        this.router.navigate(['users']);
    });

  }

  cancel(): void {
    this.router.navigate(['users']);
  }

  delete(): void {
    this.usersService.delete(this.user.id)
      .subscribe((user) => {
        this.router.navigate(['users']);
      });
  }

}


