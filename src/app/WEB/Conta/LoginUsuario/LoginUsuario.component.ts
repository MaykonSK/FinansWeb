import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private service: WebService, private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.login;
  }

  login = this.fb.group({
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required]
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

}
