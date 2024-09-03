import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

import { PagesComponent } from './pages.component';

import { DashboradComponent } from './dashborad/dashborad.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    DashboradComponent,
    PagesComponent,
    AccountSettingsComponent,
    RxjsComponent,
    PromesasComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
    BusquedaComponent,
  ],
  exports: [DashboradComponent, PagesComponent, AccountSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule
  ],
})
export class PagesModule {}
