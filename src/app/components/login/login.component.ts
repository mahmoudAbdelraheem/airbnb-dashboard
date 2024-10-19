import { Component, inject, OnInit } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
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
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginForm!: FormGroup;
  fb = inject(FormBuilder);

  constructor(
    private auth: Auth,
    private router: Router,
    private authService: AuthService
  ) {}

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.authService.getAuthState().subscribe((isLoggedIn) => {
    //   if (isLoggedIn) {
    //     this.router.navigate(['/dashboard']);
    //   }
    // });

    this.authService.getAuthState().subscribe((isLoggedIn) => {
      const currentRoute = this.router.url;
      if (isLoggedIn && currentRoute !== '/register') {
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

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  loginWithEmailAndPassword(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          console.error(error);
          this.errorMessage = this.getErrorMessage(error);
        });
    } else {
      console.log('Form is invalid');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  errorMessage: string | null = null;

  onSubmit(): void {
    const rowForm = this.form.getRawValue();
    this.authService.login(rowForm.email, rowForm.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
