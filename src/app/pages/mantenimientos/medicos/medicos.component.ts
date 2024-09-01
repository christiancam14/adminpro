import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarMedicos();
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {}

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.medicos = medicos;
      this.medicosTemp = medicos;
      console.log(medicos);
      this.cargando = false;
    });
  }

  buscar(termino: string) {
    this.cargando = true;

    if (termino.length === 0) {
      this.cargando = false;
      return (this.medicos = this.medicosTemp);
    }

    this.busquedasService.buscar('medicos', termino).subscribe((resp) => {
      if (resp) {
        this.medicos = resp as Medico[];
      }
    });

    this.cargando = false;
    return true;
  }

  abrirlModal(medico: Medico) {
    if (medico._id) {
      this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    }
  }

  eliminarMedico(medico: Medico) {
    if (medico._id === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Estás a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Usuario borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  crearMedico() {
    this.router.navigateByUrl('/dashboard/medico/nuevo');
  }
}
