import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { EnderecoInterface } from '../../Models/EnderecoInterface';
import {MatDialog} from '@angular/material/dialog';
import { Imovel } from '../../Models/Imovel';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';
import { GetImoveis } from '../../Models/GetImoveis';

@Component({
  selector: 'app-Imoveis',
  templateUrl: './Imoveis.component.html',
  styleUrls: ['./Imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  public mensagem: string;
  public imovel: Imovel;
  public imoveis: GetImoveis[];
  public infoUsuario: Usuario;

  cadastro: FormGroup;

  constructor(private service: CmsService, private fb: FormBuilder, private usuario: UsuarioService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.recuperarUsuario();
    this.configurarFormulario();
    this.recuperarImoveis(this.infoUsuario.Id!);
  }

  configurarFormulario() {
    this.cadastro = this.fb.group({
      Descricao: [null, Validators.required],
      CodigoIptu: [null],
      SitePrefeitura: [null],
      Endereco: this.fb.group({
        Cep: [null, Validators.required],
        Rua: [null, Validators.required],
        Bairro: [null, Validators.required],
        Numero: [null, Validators.required],
        Estado: [null, Validators.required],
        Municipio: [null, Validators.required]
      })
    })
  }

  recuperarUsuario() {
    this.usuario.retornaUsuario().subscribe(user => {
      this.infoUsuario = user;
    })
  }

  recuperarImoveis(userId: number) {
    this.service.recuperarImoveis(userId).subscribe(imoveis => {
      this.imoveis = imoveis;
      console.log(this.imoveis);
    })
  }

  // localizarCep() {
  //   if (this.cadastro.valid) {
  //     const cep = this.cadastro.value.cep
  //     console.log(cep);
  //     this.service.getCep(cep).subscribe(dados => {
  //       this.endereco = dados;
  //       console.log(this.endereco)
  //       this.cadastro.patchValue({
  //         logradouro: this.endereco.logradouro,
  //         uf: this.endereco.uf,
  //         localidade: this.endereco.localidade,
  //         bairro: this.endereco.bairro
  //       })
  //       if (!this.endereco.logradouro.length || !this.endereco.bairro.length)  {
  //         this.cadastro.value.logradouro.enable(); //ativar input
  //         this.mensagem = 'Não foi possivel encontrar o campo. Por favor, insira acima.'
  //       } else {
  //         this.cadastro.value.logradouro.disable();//desativar input
  //         this.mensagem = ''
  //       }
  //     }, error => {
  //       //console.log('Cep não encontrado!\n'+error)
  //     })
  //   }
  // }

  cadastrarImovel() {
    if (this.cadastro.valid) {
      this.imovel = this.cadastro.getRawValue(); //getRawValue() recupera todos os dados do formulario cadastro
      this.imovel.UsuarioId = this.infoUsuario.Id!;
      console.log(this.imovel);

      this.service.cadastrarImovel(this.imovel).subscribe(dados => {
        console.log(dados)
      })
    }
  }



}
