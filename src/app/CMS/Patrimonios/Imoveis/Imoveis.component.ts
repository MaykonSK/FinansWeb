import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { EnderecoInterface } from '../../Models/EnderecoInterface';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-Imoveis',
  templateUrl: './Imoveis.component.html',
  styleUrls: ['./Imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  mensagem: string = "";

  endereco!: EnderecoInterface;

  constructor(private service: CmsService, private fb: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  cadastro = this.fb.group({
    cep: [null, Validators.required],
    logradouro: [{value: null, disabled: true}, Validators.required],
    bairro: [{value: null, disabled: true}, Validators.required],
    numeroCasa: [null],
    uf: [{value: null, disabled: true}, Validators.required],
    localidade: [{value: null, disabled: true}, Validators.required]
  })

  recuperarImoveis() {
    this.service.recuperarImoveis().subscribe(imovel => {
      console.log(imovel);
    })
  }

  localizarCep() {
      const cep = this.cadastro.get("cep")
      console.log(cep);

      // return this.service.getCep(cep).subscribe(dados => {
      //   this.endereco = dados;
      //   this.cadastro.patchValue({logradouro: this.endereco.logradouro}) //atualizar o valor do value, que é nulo
      //   this.cadastro.patchValue({uf: this.endereco.uf})
      //   this.cadastro.patchValue({localidade: this.endereco.localidade})
      //   this.cadastro.patchValue({bairro: this.endereco.bairro})
      //   if (!this.endereco.logradouro.length || !this.endereco.bairro.length)  { //se for nulo
      //     this.cadastro.get('logradouro').enable(); //ativar input
      //     this.mensagem = 'Não foi possivel encontrar o campo. Por favor, insira acima.'
      //   } else {
      //     this.cadastro.get('logradouro').disable();//desativar input
      //     this.mensagem = ''
      //   }
      // }, error => {
      //   //console.log('Cep não encontrado!\n'+error)
      // })
  }

  cadastrarImovel() {
    if (this.cadastro.valid) {
      const imovel = this.cadastro.getRawValue(); //getRawValue() recupera todos os dados do formulario cadastro
      this.service.cadastrarImovel(imovel).subscribe(dados => {
      console.log(dados)
    })
    }
  }

}
