import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any[] = [];

  cargarMenu() {
    const menu = localStorage.getItem('menu');
    if (menu) {
      this.menu = JSON.parse(menu);
    }
  }

  /*
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Medicos', url: 'medicos' },
      ],
    },
  ];
  */

  constructor() {
    // this.menu = localStorage.getItem('menu');
  }
}
