import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  cargarMedicos() {
    const url = `${base_url}/medicos`;

    return this.http
      .get<{ ok: boolean; medicos: Medico[] }>(url, this.headers)
      .pipe(map((res) => res.medicos));
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;

    const medico = this.http
      .get<{ ok: boolean; medicos: Medico }>(url, this.headers)
      .pipe(
        map((res) => {
          return res.medicos;
        })
      );

    return medico;
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    const url = `${base_url}/medicos`;

    return this.http.post(url, medico, this.headers);
  }

  eliminarMedico(medico: Medico) {
    return this.http.delete(`${base_url}/medicos/${medico._id}`, this.headers);
  }

  actualizarMedico(medico: any) {
    console.log(medico);
    return this.http.put(`${base_url}/medicos/${medico.medico}`, medico, this.headers);
  }
}
