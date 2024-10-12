import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
