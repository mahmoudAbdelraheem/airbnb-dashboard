import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [
  //! default route for landing
  {
    path: '',
    component: LandingComponent,
    title: 'Airbnb Dashboard',
  },
  {
    path: 'dashboard',
    component: LayoutsComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [authGuard],
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Airbnb Login',
  },

  //! not found route
  {
    path: '**',
    component: NotFoundComponent,
  },
];
