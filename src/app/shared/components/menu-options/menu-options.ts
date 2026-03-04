import { Component, signal } from '@angular/core';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { menuOptionsArray } from '../../data/data';

export interface MenuOption {
  label: string;
  icon: string;
  router: string;
  sublabel: string;
}

@Component({
  selector: 'menu-options',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './menu-options.html',
})
export class MenuOptions {
  menuOptions  = signal<MenuOption[]>(menuOptionsArray);
}
