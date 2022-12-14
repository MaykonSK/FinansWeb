import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Autenticacao/token.service';
import { environment } from 'src/environments/environment';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-EsqueciMinhaSenha',
  templateUrl: './EsqueciMinhaSenha.component.html',
  styleUrls: ['./EsqueciMinhaSenha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  @Output() Loading: boolean = false;

  public mensagemError: string = ""
  public mensagemSuccess: string = ""

  formulario: FormGroup

  @ViewChild('divRecaptcha')
  divRecaptcha!: ElementRef<HTMLDivElement>;

  get grecaptcha(): any {
    const w = window as any;
    return w['grecaptcha'];
  }

  constructor(private fb: FormBuilder, private service: WebService, private ngZone: NgZone) { }

  ngOnInit() {
    this.renderizarReCaptcha();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      recaptcha: [null, Validators.required]
    })
  }

  solicitarRedefinicaoSenha() {
    const email = this.formulario.getRawValue()
    this.service.solicitaSenha(email).subscribe(x => {
      console.log(x);

      this.mensagemSuccess = x.message;
    }, error => {
      console.log(error);

      this.mensagemError = error.error.message;
    })
  }

  renderizarReCaptcha() {
    // *
    // * Para evitar que change detection seja disparado
    // * cada vez que o setTimeout for executado,
    // * executamos essa recorrĂȘncia fora da zona
    // * do Angular, por isso o usamos o runOutsideAngular
    // *
    // * Para saber mais sobre change detection:
    // * https://consolelog.com.br/como-funciona-change-detection-angular/
    // *
    this.ngZone.runOutsideAngular(() => {
      // *
      // * Se o "grecaptcha" ainda nĂŁo foi carregado ou
      // * o elemento <div> onde o reCAPTCHA serĂĄ
      // * renderizado ainda nĂŁo foi construĂ­do,
      // * aguardamos algum tempo e executamos novamente
      // * este mĂ©todo:
      // *
      if (!this.grecaptcha || !this.divRecaptcha) {
        setTimeout(() => {
          this.renderizarReCaptcha();
        }, 500);

        return;
      }

      // * Se chegou aqui Ă© porque o recaptcha jĂĄ estĂĄ
      // * carregado. EntĂŁo solicitamos sua renderizaĂ§ĂŁo
      // * na tela.
      const idElemento =
        this.divRecaptcha.nativeElement.getAttribute('id');

      this.grecaptcha.render(idElemento, {
        sitekey: environment.CaptchaKeySite,
        callback: (response: any) => {
          // * Este mĂ©todo Ă© chamado quando o usuĂĄrio
          // * resolver o desafio do CAPTCHA
          console.log(response);

          this.ngZone.run(() => {
            this.formulario.get('recaptcha')?.setValue(response);
          });
        },
      });
    });
  }

}
