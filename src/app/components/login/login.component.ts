import { Component, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginForm!: FormGroup;
  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.getAuthState().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginWithGitHub() {
    // Handle GitHub login logic
    console.log('Login with GitHub');
  }

  loginWithEmailAndPassword() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Form is invalid');
    }
  }

  goToRegister() {
    console.log('go To Register');
    // this.router.navigate(['/register']);
  }

  // login() {
  //   this.authService
  //     .login(this.email, this.password)
  //     .then(() => {
  //       this.router.navigate(['/dashboard']);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
}
