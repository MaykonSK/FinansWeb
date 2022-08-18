import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Autenticacao/token.service';
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

  constructor(private fb: FormBuilder, private service: WebService) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
    })
  }

  solicitarRedefinicaoSenha() {

  }


}
