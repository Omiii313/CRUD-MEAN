//  Extrenal imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { LogoutService } from '../services/logout.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService,
    private router: Router, private logoutService: LogoutService,
    private userService: UserService) { }

  /**
   * @author om kanada
   * @description This function is used to logout user using social media (Invoked form HTML).
   */
  public logOut(): void {
    const userDetails = this.userService.getUserDetails;
    if (userDetails.type === 'social') {
      this.socialAuthService.signOut();
    }
    this.logoutService.logout(this.userService.getUserDetails.userName).subscribe((res) => {
      this.userService.removeUSerDetails();
      this.router.navigate(['login']);
    });
  }

  ngOnInit(): void {
  }

}
