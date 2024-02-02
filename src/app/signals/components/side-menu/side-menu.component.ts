import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'signals-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'Contador', route: 'counter' },
    { name: 'Usuario', route: 'user-info' },
    { name: 'Mutaciones', route: 'properties' },
  ];
}
