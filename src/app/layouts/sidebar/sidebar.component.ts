import { MenuItems } from './../../models/menu-item';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItems;

  constructor() {
    this.menuItems = new MenuItems();
  }
}
