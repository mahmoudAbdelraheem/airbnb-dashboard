import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { SellerComponent } from './components/seller/seller.component';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';

export const routes: Routes = [
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
      },
      {
        path: 'category',
        component: ManageCategoryComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'seller',
        component: SellerComponent,
      },
      {
        path: 'admins',
        component: ManageAdminsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
