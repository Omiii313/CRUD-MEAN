import { Injectable } from '@angular/core';
import { Iuser } from 'src/app/authentication/authentication';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetails: Iuser;
  constructor() { }

  public setUserDetails(details: Iuser) {
    localStorage.setItem('userDetails', JSON.stringify(details));
    this.userDetails = details;
  }

  public removeUSerDetails() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    this.userDetails = undefined;
  }

  get getUserDetails(): Iuser {
    if (!this.userDetails) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }
    return this.userDetails;
  }
  get isAdmin(): boolean {
    return this.userDetails.type === 'admin' ? true : false;
  }

  get userId(): string {
    return this.userDetails._id;
  }

}
