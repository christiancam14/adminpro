import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,

    // LoginComponent,
    // RegisterComponent,

    // BreadcrumbsComponent,
    // SidebarComponent,
    // HeaderComponent,

    // DashboradComponent,
    // ProgressComponent,
    // Grafica1Component,
    // PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PagesModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
