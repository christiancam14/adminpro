import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {}

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
      Swal.fire('Borrado', hospital.nombre, 'success');
      this.cargarHospitales();
    });
  }

  async abrirSweetAlert() {
    const { value: nombre = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Ingresa el nombre del hospital',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (nombre?.trim().length! > 0) {
      this.hospitalService.crearHospital(nombre!).subscribe((resp) => {
        Swal.fire('Hospital creado', nombre, 'success');
        this.cargarHospitales();
      });
    }
  }

  abrirlModal(hospital: Hospital) {
    if (hospital._id) {
      this.modalImagenService.abrirModal(
        'hospitales',
        hospital._id,
        hospital.img
      );
    }
  }

  buscar(termino: string) {
    this.cargando = true;

    if (termino.length === 0) {
      this.cargando = false;
      return (this.hospitales = this.hospitalesTemp);
    }

    this.busquedasService.buscar('hospitales', termino).subscribe((resp) => {
      if (resp) {
        this.hospitales = resp as Hospital[];
      }
    });

    this.cargando = false;
    return true;
  }
}
