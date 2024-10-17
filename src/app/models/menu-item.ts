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
  }, // Fixed typo and added closing quote
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
