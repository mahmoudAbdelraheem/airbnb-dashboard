import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private authService: AuthService
  ) {}

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
