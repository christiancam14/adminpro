import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir?: File;
  public imgTemp: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadservice: FileUploadService
  ) {
    this.usuario = usuarioService.usuario!;
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  actualizarPerfil() {
    console.log(this.profileForm.value);
    this.usuarioService.actualizarPerfil(this.profileForm.value).subscribe(
      (resp) => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      (err) => {
        console.log(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  cambiarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
      this.imagenSubir = file;
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          this.imgTemp = reader.result;
        } else {
          this.imgTemp = ''; // O maneja el caso en el que result no sea un string
        }
        console.log(reader.result);
      };
    } else {
      // console.log("No hay img");
      this.imgTemp = '';
    }
  }

  subirImage() {
    if (this.imagenSubir) {
      this.fileUploadservice
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
        .then((img) => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
