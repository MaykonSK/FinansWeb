import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Autenticacao/token.service';
import { environment } from 'src/environments/environment';
import { WebService } from '../../web.service';

const KeyCaptchaSite = environment.CaptchaKeySite;

@Component({
  selector: 'app-LoginUsuario',
  templateUrl: './LoginUsuario.component.html',
  styleUrls: ['./LoginUsuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  @Output() Loading: boolean = false;

  public mensagemError: string = ""
  public mensagemSuccess: string = ""

  @ViewChild('divRecaptcha')
  divRecaptcha!: ElementRef<HTMLDivElement>;

  get grecaptcha(): any {
    const w = window as any;
    return w['grecaptcha'];
  }

  constructor(private fb: FormBuilder, private service: WebService, private tokenService: TokenService, private router: Router, private ngZone: NgZone) {
    this.renderizarReCaptcha();
  }

  ngOnInit() {
    this.login;
  }

  login = this.fb.group({
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required],
    recaptcha: [null, Validators.required]
  })

  LogarUsuario() {
    if (this.login.valid) {
      this.Loading = true;
      const dados = this.login.getRawValue();
      console.log(dados);

      this.service.logarUsuario(dados).subscribe(token => {
        var tokenFormatado = JSON.parse(JSON.stringify(token)).message.split(' ')[0]
        this.tokenService.salvaToken(tokenFormatado)
        this.router.navigate(["cms"])
        this.Loading = false;
      }, error => {
        this.Loading = false;
        this.mensagemError = error.error.message;
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
        sitekey: KeyCaptchaSite,
        callback: (response: any) => {
          // * Este método é chamado quando o usuário
          // * resolver o desafio do CAPTCHA
          console.log(response);

          this.ngZone.run(() => {
            this.login.get('recaptcha')?.setValue(response);
          });
        },
      });
    });
  }


}
