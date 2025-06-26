import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginUser: any = new EventEmitter<any>();;
  @Output() registerUserClicked: any = new EventEmitter<any>();;

  loginForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router,
        private toastr: ToastrService
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {

      // Api call to login user
      this.apiService.loginUser(this.loginForm.value).subscribe(
        (response) => {

          // toster message
          this.toastr.success('Login Successful', 'Success');
          // store user data in local storage
          localStorage.setItem('user', JSON.stringify(response));
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin', 'dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
  
        },
        (error) => {
          alert('Login failed.');
          console.error(error);
        }
      );

      console.log("Login Successful:", this.loginForm.value);
    } else {
      console.log("Invalid Form!");
    }
  }

  onRegisterClick(event: MouseEvent) {
    this.router.navigate(['/register']);
  }
}
