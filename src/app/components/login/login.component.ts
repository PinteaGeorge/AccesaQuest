import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'app/helpers/validateForm';
import { UserStoreService } from 'app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.storeToken(res.token);
          const tokenPayload = this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard']);
          this.toastr.success('Login Successful', 'Succes', {
            positionClass: 'toast-bottom-right'
          });
        },
        error: err => this.toastr.error(err.error.message, 'Error', {
          positionClass: 'toast-bottom-right'
        }),
      })
    } else {
      ValidateForm.validateFormFields(this.loginForm);
      this.toastr.error('Your form is invalid', 'Error', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
