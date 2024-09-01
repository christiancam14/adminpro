import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medicos.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales!: Hospital[];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.medicoForm = fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });

    this.cargarHospitales();

    this.medicoForm
      .get('hospital')
      ?.valueChanges.subscribe(
        (hospitalId) =>
          (this.hospitalSeleccionado = this.hospitales.find(
            (h) => h._id === hospitalId
          ))
      );

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });
  }

  ngOnInit(): void {}

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      // Nuevo medico
      return;
    }

    this.medicoService.obtenerMedicoPorId(id).subscribe({
      next: (medico) => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, hospital } = medico;
        this.medicoForm.setValue({ nombre, hospital: hospital._id });
        this.medicoSeleccionado = medico;
        return;
      },
      error: (err) => {
        // Manejar el error, por ejemplo, redirigir al listado de médicos
        console.error('Error al cargar el médico:', err);
        this.router.navigateByUrl(`/dashboard/medicos`);
      },
    });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // Actualizar
      const data = {
        medico: this.medicoSeleccionado._id,
        ...this.medicoForm.value,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Actualizado', `${nombre} creado correctamente`, 'success');
      });
    } else {
      // Crear

      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }
}
