import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users =  this.usersService.getUsers();
  }
  /* Function to sort by heading in ascending order */
  sortUsersBy(e): void {
    if (e.nodeName === 'SPAN') {
        if (e.id === 'userName') {
        this.users = this.users.sort((a, b) => (a.userName < b.userName) ?  -1 : (a.userName > b.userName) ? 1 : 0);
        } else if (e.id === 'firstName') {
         this.users = this.users.sort((a, b) => (a.firstName < b.firstName) ?  -1 : (a.firstName > b.firstName) ? 1 : 0);
        } else if (e.id === 'lastName') {
         this.users = this.users.sort((a, b) => (a.lastName < b.lastName) ?  -1 : (a.lastName > b.firstName) ? 1 : 0);
        } else if (e.id === 'birthday') {
          this.users = this.users.sort((a, b) =>
          (a.birthday.getTime() < b.birthday.getTime()) ? -1 : (a.birthday.getTime() > b.birthday.getTime()) ? 1 : 0);
        } else if (e.id === 'email') {
         this.users = this.users.sort((a, b) => (a.email < b.email) ?  -1 :  (a.email > b.email) ? 1 : 0);
        } else if (e.id === 'date') {
         this.users = this.users.sort((a, b) =>
         (a.joinDate.getTime() < b.joinDate.getTime() ) ? -1 : (a.joinDate.getTime() > b.joinDate.getTime()) ? 1 : 0);
        }
  }
}

}
