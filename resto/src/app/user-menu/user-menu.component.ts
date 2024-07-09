import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  menus: Menu[] = []; // Initialize menus with an empty array

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus(): void {
    this.menuService.getMenus().subscribe((data: Menu[]) => {
      this.menus = data;
    });
  }
}
