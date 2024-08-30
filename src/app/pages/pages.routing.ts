import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboradComponent } from './dashborad/dashborad.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboradComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Account-settings' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
    ],
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
