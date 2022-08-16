import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { ContaPagar } from '../../Models/ContaPagar';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { GetContasPagar } from '../../Models/GetContasPagar';


@Component({
  selector: 'app-ContasPagar',
  templateUrl: './ContasPagar.component.html',
  styleUrls: ['./ContasPagar.component.css']
})
export class ContasPagarComponent implements OnInit {

  //fechar modal
  @ViewChild('closeBtn') closeBtn: ElementRef;

  title = "Contas a pagar"

  @Output() mensagemError: string = "";
  @Output() mensagemSuccess: string = "";

  cadastro: FormGroup;
  conta: ContaPagar;
  contas: GetContasPagar[];
  infoUsuario: Usuario;

  total: any;

  constructor(private service: CmsService, private fb: FormBuilder, private usuario: UsuarioService) { }

  ngOnInit() {
    this.configurarFormulario();
    this.recuperarUsuario();
    this.recuperarContas()
  }

  recuperarUsuario() {
    this.usuario.retornaUsuario().subscribe(user => {
      this.infoUsuario = user;
      console.log(this.infoUsuario);

    })
  }

  configurarFormulario() {
    this.cadastro = this.fb.group<any>({
      Descricao: [null, Validators.required],
      Valor: [null, Validators.required],
      Vencimento: [null, Validators.required],
      Recorrente: false
    })
  }

  cadastrarConta() {
    if (this.cadastro.valid) {
      this.conta = this.cadastro.getRawValue();
      this.conta.UsuarioID = this.infoUsuario.usuario!;
      console.log(this.conta);

      this.service.cadastrarContaPagar(this.conta).subscribe(dados => {
        console.log(dados);
        this.mensagemSuccess = "Conta cadastrada com sucesso."
        this.recuperarContas();
        this.closeModal();
      }, error => {
        this.mensagemError = "Houve um erro ao tentar cadastrar."
      })

    }
  }

  recuperarContas() {
    this.service.recuperarContasPagar().subscribe(dados => {
      this.contas = dados;
      console.log(this.contas)
    })
  }

  deletarConta(id: number) {
    this.service.deletarContaPagar(id).subscribe(dados => {
      this.recuperarContas();
    })
  }

  somarContas() {
    this.contas.forEach(element => {
      this.total += element.valor
    });
    console.log(this.total);

  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
