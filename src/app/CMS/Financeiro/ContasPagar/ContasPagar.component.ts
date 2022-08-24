import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { ContaPagar } from '../../Models/ContaPagar';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { GetContasPagar } from '../../Models/GetContasPagar';
import { UpdateContaPagar } from '../../Models/UpdateContaPagar';
import { ContaPaga } from '../../Models/ContaPaga';


@Component({
  selector: 'app-ContasPagar',
  templateUrl: './ContasPagar.component.html',
  styleUrls: ['./ContasPagar.component.css']
})
export class ContasPagarComponent implements OnInit {

  //modal
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;

  title = "Contas a pagar"

  @Output() mensagemError: string = "";
  @Output() mensagemSuccess: string = "";

  cadastro: FormGroup;
  conta: ContaPagar;
  contas: GetContasPagar[];
  infoUsuario: Usuario;
  contaUnica: GetContasPagar;

  updateContaPagar: UpdateContaPagar;

  contaPaga: ContaPaga = new ContaPaga;

  ContasTotais: number;

  constructor(private service: CmsService, private fb: FormBuilder, private usuario: UsuarioService) { }

  ngOnInit() {
    this.recuperarUsuario();
    this.configurarFormulario();
    this.load();
  }

  load() {
    this.recuperarContas(this.infoUsuario.Id!)
    this.totalContas();
  }

  recuperarUsuario() {
    this.usuario.retornaUsuario().subscribe(user => {
      this.infoUsuario = user;
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
      this.conta.UsuarioID = this.infoUsuario.Id!;

      this.service.cadastrarContaPagar(this.conta).subscribe(dados => {
        this.mensagemSuccess = dados.message;
        this.load();
        this.closeModal();
      }, error => {
        this.mensagemError = error.error.message;
      })

    }
  }

  btnCadastro() {
    this.cadastro.reset();
  }

  BtnEditarConta(id: number) {
    this.contaUnica = this.contas.find(conta => conta.id == id)!;

    this.cadastro.get("Descricao")?.setValue(this.contaUnica.descricao)
    this.cadastro.get("Valor")?.setValue(this.contaUnica.valor)
    this.cadastro.get("Vencimento")?.setValue(this.contaUnica.vencimento)
    this.cadastro.get("Recorrente")?.setValue(this.contaUnica.recorrente)
  }

  salvarEdicao() {
    this.conta = this.cadastro.getRawValue();
    const idConta = this.contaUnica.id;

    this.service.atualizarConta(idConta, this.conta).subscribe(dados => {
      this.closeModal2()
      this.load();
      this.mensagemSuccess = dados.message;
    }, error => {
      this.mensagemError = error.error.message;
    })
  }

  recuperarContas(usuarioId: number) {
    if (usuarioId != null) {
      this.service.recuperarContasPagar(usuarioId).subscribe(dados => {
        this.contas = dados;
      }, error => {
      })
    }
  }

  deletarConta(id: number) {
    this.service.deletarContaPagar(id).subscribe(dados => {
      this.load();
    })
  }

  btnPaga(id: number) {
    this.contaUnica = this.contas.find(conta => conta.id == id)!;

    if (this.contaUnica != null) {
      this.contaPaga.Paga = true;

      this.service.contaPaga(this.contaUnica.id, this.contaPaga).subscribe(x => {
        this.load();
        this.mensagemSuccess = x.message;
      }, error => {
        this.mensagemError = error.error.message;
      })
    }

  }

  totalContas() {
    this.service.totalContas(this.infoUsuario.Id!).subscribe(x => {
      this.ContasTotais = x;
    })
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeModal2(): void {
    this.closeBtn2.nativeElement.click();
  }

}

