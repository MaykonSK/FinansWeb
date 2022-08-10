import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { EnderecoInterface } from '../../Models/EnderecoInterface';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-Imoveis',
  templateUrl: './Imoveis.component.html',
  styleUrls: ['./Imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  public mensagem: string;
  public endereco: EnderecoInterface;

  cadastro: FormGroup;

  constructor(private service: CmsService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.cadastro = this.fb.group({
      cep: [null, Validators.required],
      logradouro: [null, Validators.required],
      bairro: [null, Validators.required],
      numeroCasa: [null, Validators.required],
      uf: [null, Validators.required],
      localidade: [null, Validators.required]
    })
  }

  recuperarImoveis() {
    this.service.recuperarImoveis().subscribe(imovel => {
      console.log(imovel);
    })
  }

  localizarCep() {
    if (this.cadastro.valid) {
      const cep = this.cadastro.value.cep
      console.log(cep);
      this.service.getCep(cep).subscribe(dados => {
        this.endereco = dados;
        console.log(this.endereco)
        this.cadastro.patchValue({
          logradouro: this.endereco.logradouro,
          uf: this.endereco.uf,
          localidade: this.endereco.localidade,
          bairro: this.endereco.bairro
        })
        if (!this.endereco.logradouro.length || !this.endereco.bairro.length)  {
          this.cadastro.value.logradouro.enable(); //ativar input
          this.mensagem = 'Não foi possivel encontrar o campo. Por favor, insira acima.'
        } else {
          this.cadastro.value.logradouro.disable();//desativar input
          this.mensagem = ''
        }
      }, error => {
        //console.log('Cep não encontrado!\n'+error)
      })
    }
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
