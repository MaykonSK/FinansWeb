import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { ContaPagar } from '../../Models/ContaPagar';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { GetContasPagar } from '../../Models/GetContasPagar';
import { UpdateContaPagar } from '../../Models/UpdateContaPagar';


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

  updateContaPagar: UpdateContaPagar

  constructor(private service: CmsService, private fb: FormBuilder, private usuario: UsuarioService) { }

  ngOnInit() {
    this.configurarFormulario();
    this.recuperarUsuario();
    this.recuperarContas(this.infoUsuario.Id!)
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
      console.log(this.conta);

      this.service.cadastrarContaPagar(this.conta).subscribe(dados => {
        console.log(dados);
        this.mensagemSuccess = "Conta cadastrada com sucesso."
        this.recuperarContas(this.infoUsuario.Id!);
        this.closeModal();
      }, error => {
        this.mensagemError = "Houve um erro ao tentar cadastrar."
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
      this.recuperarContas(this.infoUsuario.Id!);
      this.mensagemSuccess = dados.message;
    }, error => {
      this.mensagemError = error.error.message;
    })
  }

  recuperarContas(usuarioId: number) {
    if (usuarioId != null) {
      this.service.recuperarContasPagar(usuarioId).subscribe(dados => {
        this.contas = dados;
        console.log(this.contas)
      }, error => {
        console.log(error);
      })
    }
  }

  deletarConta(id: number) {
    this.service.deletarContaPagar(id).subscribe(dados => {
      this.recuperarContas(this.infoUsuario.Id!);
    })
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeModal2(): void {
    this.closeBtn2.nativeElement.click();
  }

}
