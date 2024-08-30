import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email, Validators.minLength(3)],
    ],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  login() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value as LoginForm).subscribe(
        (resp) => {
          if (this.loginForm.get('remember')?.value !== null) {
            localStorage.setItem('email', this.loginForm.get('email')?.value || '');
          } else {
            localStorage.removeItem('email');
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        }
      );
    } else {
      console.log('Faltan campos por llenar');
    }

    return;

    this.router.navigateByUrl('/');
  }
}
