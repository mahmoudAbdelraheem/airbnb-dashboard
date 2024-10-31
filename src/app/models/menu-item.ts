import { Injectable } from '@angular/core';

export interface Menu {
  state: string; // Changed from String to string
  name: string; // Changed from String to string
  icon: string;
  role: string;
}

const MENUITEMS: Menu[] = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    role: '',
  },
  {
    state: 'category',
    name: 'Manage Category',
    icon: 'category',
    role: '',
  },
  {
    state: 'product',
    name: 'Manage Product',
    icon: 'inventory_2',
    role: '',
  },
  {
    state: 'user',
    name: 'Manage User',
    icon: 'account_circle',
    role: '',
  },
  {
    state: 'seller',
    name: 'Manage Seller',
    icon: 'account_circle',
    role: '',
  },
  {
    state: 'admins',
    name: 'Add Admins',
    icon: 'account_circle',
    role: '',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
