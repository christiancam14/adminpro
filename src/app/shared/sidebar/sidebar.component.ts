import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sider',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {}
}
