import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  public mensagem: string = ""
  novasenha: NovaSenha;

  constructor(private fb: FormBuilder, private service: WebService, private tokenService: TokenService, private router: Router) { }

  formulario = this.fb.group({
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required],
    RePassword: [null, Validators.required]
  })

  ngOnInit() {
  }

  redefinirSenha() {
    const dados = this.formulario.getRawValue();
    this.service.redefinirSenha(dados).subscribe(x => {
      console.log(x);
    })
  }

}
