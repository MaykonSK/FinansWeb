import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Autenticacao/token.service';
import { NovaSenha } from '../../Models/NovaSenha';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-Redefinir-senha',
  templateUrl: './Redefinir-senha.component.html',
  styleUrls: ['./Redefinir-senha.component.css']
})
export class RedefinirSenhaComponent implements OnInit {

  @Output() Loading: boolean = false;

  public mensagemError: string = ""
  public mensagemSuccess: string = ""
  novasenha: NovaSenha;

  private token: any;

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private service: WebService, private tokenService: TokenService, private router: Router, private route: ActivatedRoute) { }

  configurarFormulario() {
    this.formulario = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required],
      RePassword: [null, Validators.required]
    })
  }


  ngOnInit() {
    this.configurarFormulario();
    this.token = this.route.snapshot.queryParamMap.get("token");
    console.log("token: "+this.token);

  }

  redefinirSenha() {
    const dados = this.formulario.getRawValue();
    this.novasenha = dados;
    this.novasenha.Token = this.token;
    console.log(this.novasenha);
    this.service.redefinirSenha(dados).subscribe(x => {
      console.log(x);
    }, error => {
      this.mensagemError = error.error.message;
    })
  }

}
