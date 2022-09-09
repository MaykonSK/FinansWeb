import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { EnderecoInterface } from '../../Models/EnderecoInterface';
import {MatDialog} from '@angular/material/dialog';
import { Imovel } from '../../Models/Imovel';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';
import { GetImoveis } from '../../Models/GetImoveis';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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

  selectFile: any;
  ProgressoUpload: string;
  imageUrl: any

  cadastro: FormGroup;

  constructor(private service: CmsService, private fb: FormBuilder, private usuario: UsuarioService, private sanitizer: DomSanitizer) {
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
      file: [null, Validators.required],
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
    this.service.recuperarImoveis(userId).subscribe(x => {
      this.imoveis = x;
    })
  }

  UploadImg(event: any) {
    //seleciona os dados do arquivo
    this.selectFile = <File>event.srcElement.files[0]
    //seta o nome do arquivo no label
    document.getElementById('customFileLabel')!.innerHTML = this.selectFile.name
  }

  ConverterImagem(img: string) {
    let objectURL = 'data:image/jpeg;base64,' + img;
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  deletarImovel(id: number) {
    this.service.deletarImovel(id).subscribe(x => {
      console.log(x);
      this.recuperarImoveis(this.infoUsuario.Id!);
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
      this.imovel.Imagem = this.selectFile.name
      this.imovel.UsuarioId = this.infoUsuario.Id!;

      this.service.cadastrarImovel(this.imovel).subscribe(dados => {
        this.uploadImagem();
        this.recuperarImoveis(this.infoUsuario.Id!);
      })
    }
  }

  uploadImagem() {

      const formData = new FormData;
      formData.append('file', this.selectFile)

      this.service.uploadFileImovel(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.ProgressoUpload = (Math.round(event.loaded / event.total * 100) + '%');
          console.log(this.ProgressoUpload);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      }, error => {
        console.log(error.error.message);
      })

  }



}
