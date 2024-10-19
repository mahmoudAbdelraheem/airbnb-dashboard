import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((isLoggedIn) => {
      const currentRoute = this.router.url;
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  constructor(
    // private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rowForm = this.form.getRawValue();
    this.authService
      .register(rowForm.email, rowForm.username, rowForm.password)
      .subscribe({
        next: () => {
          // this.router.navigate(['/login']);
          this.authService.logout();
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }
}
