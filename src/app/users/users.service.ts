import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  Users = [
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('07/07/1986'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'kwalker', firstName : 'Kevin' , lastName: 'Walker', 
    birthday: new Date('12/12/1995'), email: 'kwalker@gmail.com', joinDate: new Date('10/30/2018')},
    {userName : 'mwilliams', firstName : 'Michelle' , lastName: 'Williams', 
    birthday: new Date('10/11/1988'), email: 'mwilliams@gmail.com', joinDate: new Date('10/28/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('07/07/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'asmith1988', firstName : 'Allan' , lastName: 'Smith', 
    birthday: new Date('12/07/1988'), email: 'asmith88@gmail.com', joinDate: new Date('09/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')},
    {userName : 'tpmccarthy1', firstName : 'Tom' , lastName: 'McCarthy', 
    birthday: new Date('11/01/2000'), email: 'tpmccarthy1@gmail.com', joinDate: new Date('11/01/2018')}
  ];
  constructor() { }

  getUsers(): {}[] {
    return this.Users;
  }

}
