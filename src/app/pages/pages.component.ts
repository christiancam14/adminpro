import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})

export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const linkTheme = document.querySelector('#theme');
    let themeUrl =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    linkTheme?.setAttribute('href', themeUrl);
  }
}
