import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  @Output() registerUser: any = new EventEmitter<any>();;
  registerForm: FormGroup;
  submitted = false;

  roles = [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService


  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom Validator: Check if password and confirmPassword match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {

      // api call to create user
      this.apiService.addUser(this.registerForm.value).subscribe(
        (response) => {
          this.toastr.success('Registerd Successful', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error('Registerd Failed', 'failed');
          console.error(error);
        }
      );
      alert("Registration Successful!");
    } else {
      alert('Invalid Form!');
    }
  }

  onBackClick() {
    this.router.navigate(['/login']);
  }

}
