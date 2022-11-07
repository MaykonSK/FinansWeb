import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Conta',
  templateUrl: './Conta.component.html',
  styleUrls: ['./Conta.component.css']
})
export class ContaComponent implements OnInit {

  @Output() Loading: boolean;

  formulario: FormGroup;
  selectFile: any;
  imageUrl: any;

  public infoUsuario: Usuario;

  ProgressoUpload: string;

  constructor(private fb: FormBuilder, private service: CmsService, private sanitizer: DomSanitizer, private usuario: UsuarioService) { }

  ngOnInit() {
    this.recuperarUsuario();
    this.configurarFormulario();
    this.getInfoUser();
  }

  configurarFormulario() {
    this.formulario = this.fb.group<any>({
      file: [null, Validators.required]
    })
  }

  UploadImg(event: any) {
    //seleciona os dados do arquivo
    this.selectFile = <File>event.srcElement.files[0]
    //seta o nome do arquivo no label
    document.getElementById('customFileLabel')!.innerHTML = this.selectFile.name
  }

  recuperarUsuario() {
    this.usuario.retornaUsuario().subscribe(user => {
      this.infoUsuario = user;
    })
  }

  salvar() {
    if (this.formulario.valid)  {
      const formData = new FormData;
      formData.append('file', this.selectFile)

      this.service.uploadFileUser(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.ProgressoUpload = (Math.round(event.loaded / event.total * 100) + '%');
          console.log(this.Loading);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
        this.Loading = false;
      }, error => {
        console.log(error.error.message);
      })
    }
  }

  getInfoUser() {
    this.service.getUser(this.infoUsuario.Id!).subscribe(x => {
      console.log(x);
      let objectURL = 'data:image/jpeg;base64,' + x.imagem;
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

}
