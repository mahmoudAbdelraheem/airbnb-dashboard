import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './manage-admins.component.html',
  styleUrl: './manage-admins.component.scss',
})
export class ManageAdminsComponent {
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }

  constructor(private router: Router, private authService: AuthService) {}

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      default:
        return 'Invalid credentials';
    }
  }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.valid) {
      const email = this.form.value.email!;
      const username = this.form.value.username!;
      const password = this.form.value.password!;

      this.authService.register(email, username, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = this.getErrorMessage(err);
          console.error('Registration error:', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
