import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService) {
    this.sidebarService.cargarMenu();
  }

  ngOnInit(): void {
    const linkTheme = document.querySelector('#theme');
    let themeUrl =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    linkTheme?.setAttribute('href', themeUrl);

    // customInitFunctions();
  }
  
}
