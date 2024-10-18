import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  getAuthState(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        console.log('user', user);

        observer.next(!!user);
        observer.complete();
      });
    });
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['/login']));
  }

  canActivate(): Observable<boolean> {
    return this.getAuthState().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          console.log('User not logged in, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
        console.log('User is logged in');
        return true;
      })
    );
  }
}
