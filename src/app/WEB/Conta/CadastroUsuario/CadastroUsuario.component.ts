import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-CadastroUsuario',
  templateUrl: './CadastroUsuario.component.html',
  styleUrls: ['./CadastroUsuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('divRecaptcha')
  divRecaptcha!: ElementRef<HTMLDivElement>;

  get grecaptcha(): any {
    const w = window as any;
    return w['grecaptcha'];
  }

  constructor(private fb: FormBuilder, private service: WebService, private ngZone: NgZone) { }

  @Output() Loading: boolean = false;

  mensagemError: string = "";
  mensagemSuccess: string = "";

  ngOnInit() {
    this.renderizarReCaptcha();
    this.cadastro;
  }

  cadastro = this.fb.group({
    Name: [null, Validators.required],
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required],
    RePassword: [null, Validators.required],
    recaptcha: [null, Validators.required]
  })

  CadastrarUsuario() {
    if (this.cadastro.valid) {
      this.Loading = true;
      const novoUsuario = this.cadastro.getRawValue(); //getRawValue() recupera todos os dados do formulario cadastro
      this.service.cadastrarUsuario(novoUsuario).subscribe(user => {
        this.mensagemSuccess = user.message;
        this.Loading = false;
      }, error => {
        this.mensagemError = error.error.message
        this.Loading = false;
      })
    }
  }

  renderizarReCaptcha() {
    // *
    // * Para evitar que change detection seja disparado
    // * cada vez que o setTimeout for executado,
    // * executamos essa recorrência fora da zona
    // * do Angular, por isso o usamos o runOutsideAngular
    // *
    // * Para saber mais sobre change detection:
    // * https://consolelog.com.br/como-funciona-change-detection-angular/
    // *
    this.ngZone.runOutsideAngular(() => {
      // *
      // * Se o "grecaptcha" ainda não foi carregado ou
      // * o elemento <div> onde o reCAPTCHA será
      // * renderizado ainda não foi construído,
      // * aguardamos algum tempo e executamos novamente
      // * este método:
      // *
      if (!this.grecaptcha || !this.divRecaptcha) {
        setTimeout(() => {
          this.renderizarReCaptcha();
        }, 500);

        return;
      }

      // * Se chegou aqui é porque o recaptcha já está
      // * carregado. Então solicitamos sua renderização
      // * na tela.
      const idElemento =
        this.divRecaptcha.nativeElement.getAttribute('id');

      this.grecaptcha.render(idElemento, {
        sitekey: environment.CaptchaKeySite,
        callback: (response: any) => {
          // * Este método é chamado quando o usuário
          // * resolver o desafio do CAPTCHA
          console.log(response);

          this.ngZone.run(() => {
            this.cadastro.get('recaptcha')?.setValue(response);
          });
        },
      });
    });
  }

}
