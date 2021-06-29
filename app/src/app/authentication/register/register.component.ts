// External imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Internal imports
import { Iuser } from '../authentication';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup; // holds registration form details
  public submitted: boolean = false; // on click of register button click
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }
  /**
   * @author om kanada
   * @description This function is used to register user.
   */
  public register(): void {
    this.submitted = true;
    // to check required fields are filled
    if (this.registrationForm.valid) {
      this.authenticationService.register(this.registrationForm.value).subscribe((res) => {
        if (res.success) {
          if (res?.data) {
            this.router.navigate(['login']);
          }
        } else {
          if (res.code === 422) {
            window.alert(res.msg);
          }
        }
      }, (error) => {
        window.alert(error);
      });
    }
  }
  /**
   * @author om kanada
   * @description This function is used to create registration form.
   */
  private initRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
  // intialization.
  ngOnInit(): void {
    this.initRegistrationForm();
  }

}

