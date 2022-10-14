import { Component, ElementRef, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Autenticacao/token.service';
import { environment } from 'src/environments/environment';
import { Login } from '../../Models/login';
import { WebService } from '../../web.service';

const KeyCaptchaSite = environment.CaptchaKeySite;

@Component({
  selector: 'app-LoginUsuario',
  templateUrl: './LoginUsuario.component.html',
  styleUrls: ['./LoginUsuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  @ViewChild('login', { read: NgForm }) login!: NgForm; //apenas valida na hora do submit
  data: Login;

  @Output() Loading: boolean = false;

  public mensagemError: string = ""
  public mensagemSuccess: string = ""

  @ViewChild('divRecaptcha') public divRecaptcha!: ElementRef<HTMLDivElement>;

  get grecaptcha(): any {
    const w = window as any;
    return w['grecaptcha'];
  }

  constructor(private fb: FormBuilder, private service: WebService, private tokenService: TokenService, private router: Router, private ngZone: NgZone) {
    this.renderizarReCaptcha();
  }

  ngOnInit() {
    //this.login;
    //atribui os campos para o [(ngModel)]
    this.data = new Login(); //inicializa
  }

  // login = this.fb.group({
  //   Email: [null, [Validators.required, Validators.email]],
  //   Password: [null, Validators.required],
  //   recaptcha: [null, Validators.required]
  // })

  LogarUsuario() {
    if (this.login.valid) {
      this.Loading = true;
      const dados = this.data; //pega direto o valor do data
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

    this.ngZone.runOutsideAngular(() => {

      if (!this.grecaptcha || !this.divRecaptcha) {
        setTimeout(() => {
          this.renderizarReCaptcha();
        }, 500);

        return;
      }

      const idElemento =
        this.divRecaptcha.nativeElement.getAttribute('id');

      this.grecaptcha.render(idElemento, {
        sitekey: KeyCaptchaSite,
        callback: (response: any) => {
          console.log(response);

          this.ngZone.run(() => {
            this.data.recaptcha = response; //passa direto a chave para o data
          });
        },
      });
    });
  }


}
