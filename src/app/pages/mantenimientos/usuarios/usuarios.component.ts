import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarUsuarios();
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp) => {
      const { total, usuario } = resp;
      this.totalUsuarios = total;
      if (usuario.length !== 0) {
        this.usuarios = usuario;
        this.usuariosTemp = usuario;
      }
      this.cargando = false;
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    this.cargando = true;

    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }

    this.busquedasService.buscar('usuarios', termino).subscribe((resp) => {
      if (resp) {
        this.usuarios = resp as Usuario[];
      }
    });

    this.cargando = false;
    return true;
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }

    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Estás a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  abrirlModal(usuario: Usuario) {
    if (usuario.uid) {
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }
  }

  ngOnInit(): void {}
}
