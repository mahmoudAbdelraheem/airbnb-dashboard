import { Injectable } from '@angular/core';

export interface Menu {
  state: string; // Changed from String to string
  name: string; // Changed from String to string
}

const MENUITEMS: Menu[] = [
  { state: 'dashboard', name: 'Dashboard' }, // Fixed typo and added closing quote
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
