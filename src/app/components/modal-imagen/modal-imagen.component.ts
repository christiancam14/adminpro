import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir?: File;
  public imgTemp: string = '';

  constructor(
    public modalImagenService: ModalImagenService,
    public fileUploadservice: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.imgTemp = '';
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagenSubir = file;
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          this.imgTemp = reader.result;
        } else {
          this.imgTemp = ''; // O maneja el caso en el que result no sea un string
        }
      };
    } else {
      this.imgTemp = '';
    }
  }

  subirImage() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo || 'usuarios';

    if (this.imagenSubir) {
      this.fileUploadservice
        .actualizarFoto(this.imagenSubir, tipo, id!)
        .then((img) => {
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
