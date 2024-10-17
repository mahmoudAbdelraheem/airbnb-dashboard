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
    name: 'Manager Category',
    icon: 'category',
    role: '',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
