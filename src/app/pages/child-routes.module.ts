import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboradComponent } from './dashborad/dashborad.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimiento

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
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
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busqueda' },
  },
  // Mantenimientos
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Mantenimiento de médicos' },
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Hospitales' },
  },
  // Rutas de Admin
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Usuarios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
