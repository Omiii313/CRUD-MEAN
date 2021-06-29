// External imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from 'src/app/shared/services/user.service';
// Internal imports
import { Iuser } from '../authentication';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup; // holds login form details
  public submitted: boolean = false; // when click to login button

  constructor(private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService) { }
  /**
   * @author om kanada
   * @description This function is used to create login form.
   */
  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  /**
   * @author om kanada
   * @description This function is used to login user using social media (Invoked form HTML).
   * @param name // hold name of social media
   */
  public loginWithSocialMedia(name: string): void {
    // used to decide name of provider
    if (name === 'google') {
      name = GoogleLoginProvider.PROVIDER_ID;
    } else {
      name = FacebookLoginProvider.PROVIDER_ID;
    }
    // social auth service provided by angularx to signin using social media.
    this.socialAuthService.signIn(name);
    // for get user details after login from social media. 
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.authService.socialLogin({ userName: user.name, socialId: user.id }).subscribe((res) => {
        this.setUSerDetails(res);
      });
    });
  }

  private setUSerDetails(res): void {
    if (res?.data) {
      this.userService.setUserDetails(res.data);
      this.router.navigate(['post', 'index']);
    }
  }
  /**
   * @author om kanada
   * @description This function is used to login user(Invoked form HTML).
   */
  public login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
        this.setUSerDetails(res);
      }, (error) => {
        window.alert(error);
      });
    }
  }

  // intialization of component.
  ngOnInit() {
    this.initLoginForm();

  }

}
