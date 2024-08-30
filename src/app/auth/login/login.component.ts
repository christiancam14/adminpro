import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

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

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '399155337581-l2b5gpn1k8icg2kl997k9tqbms10uojn.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe((resp) => {
      this.router.navigateByUrl('/');
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value as LoginForm).subscribe(
        (resp) => {
          if (this.loginForm.get('remember')?.value === true) {
            localStorage.setItem(
              'email',
              this.loginForm.get('email')?.value || ''
            );
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
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
