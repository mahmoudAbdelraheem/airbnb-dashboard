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
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
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
    private authService: AuthService,
    private firestore: Firestore
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
    console.log('Login with GitHub');
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Invalid credentials';
      case 'auth/wrong-password':
        return 'Invalid credentials';
      case 'auth/invalid-email':
        return 'Invalid credentials';
      default:
        return 'Invalid credentials';
    }
  }

  async loginWithEmailAndPassword(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        const userId = userCredential.user.uid;

        const adminDocRef = doc(this.firestore, `admins/${userId}`);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          this.router.navigate(['/dashboard']);
        } else {
          await this.auth.signOut();
          this.errorMessage = 'Access restricted to admins only';
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error);
      }
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
