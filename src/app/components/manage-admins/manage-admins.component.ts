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
          console.log('Admin successfully registered');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.code;
          console.error('Registration error:', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
