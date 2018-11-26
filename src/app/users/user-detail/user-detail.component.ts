import { Component, OnInit } from '@angular/core';
import { UsersService, IUser } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './user-detail.component.html',
})

export class UserDetailComponent implements OnInit {

  user: IUser;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
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
            userName: '',
            firstName: '',
            lastName: '',
            birthday: new Date(),
            email: '',
            joinDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
  }

  private formValid(): boolean {
    const reqFields = [
                    this.user.userName,
                    this.user.firstName,
                    this.user.lastName,
                    this.user.birthday,
                    this.user.email
                ];
    return reqFields ? true : false;
  }

  save(): void {
    if (!this.formValid() ) {
        console.log('form not valid');
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

}


