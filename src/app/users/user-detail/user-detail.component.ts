import { Component, OnInit } from '@angular/core';
import { UsersService, IUser } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


const defaultUser: IUser = {
  id: 0,
  userName: '',
  firstName: '',
  lastName: '',
  birthday: new Date(),
  email: '',
  joinDate: new Date(),
  createdAt: null,
  updatedAt: null
};

@Component({
  templateUrl: './user-detail.component.html',
})

export class UserDetailComponent implements OnInit {

  user: IUser = { ...defaultUser };

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const idAsString = this.route.snapshot.paramMap.get('entityId');
    const id = isNaN(parseInt(idAsString, 0)) ? 0 : parseInt(idAsString, 0);
    if (id) {
      this.usersService.getUserById(id)
      .subscribe(
        (user) => {
            console.log(this.user);
            this.user = user;
        },
        (error) => {
          this.router.navigate(['users']);
          console.log('error');
        },
      );
    }
  }

  private formValid(): boolean {
      if (this.user.userName.trim() && this.user.firstName.trim()
          && this.user.lastName.trim() && this.user.email.trim()) {
          return true;
      }
      return false;
  }

  submit(): void {
      if (!this.formValid()) {
          // TODO CCC: add not valid message here
          console.log('form not valid');
          return;
      }

      const user = {...this.user};

      if (user.id) {
          this.usersService.updateUser(user)
              .subscribe(() => {
                  this.router.navigate(['users']);
              });
      } else {
          this.usersService.createUser(user)
              .subscribe(() => {
                  this.router.navigate(['users']);
              });
      }

  }

  cancel(): void {
      this.router.navigate(['users']);
  }

}


