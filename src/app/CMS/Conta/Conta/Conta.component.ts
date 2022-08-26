import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';

@Component({
  selector: 'app-Conta',
  templateUrl: './Conta.component.html',
  styleUrls: ['./Conta.component.css']
})
export class ContaComponent implements OnInit {

  @Output() Loading: string | null;

  formulario: FormGroup;
  selectFile: any;
  imageUrl: any;
  sanitizer: any;

  ProgressoUpload: string;

  constructor(private fb: FormBuilder, private service: CmsService) { }

  ngOnInit() {
    this.configurarFormulario();
    // this.getImagem();
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

  salvar() {
    if (this.formulario.valid)  {
      const formData = new FormData;
      formData.append('file', this.selectFile)

      this.service.uploadFile(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.ProgressoUpload = (Math.round(event.loaded / event.total * 100) + '%');
          console.log(this.Loading);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
        this.Loading = null;
      }, error => {
        console.log(error.error.message);
      })
    }
  }

  getImagem() {
    this.service.getImg().subscribe(x => {
      console.log(x);
      // let objectURL = 'data:image/jpeg;base64,' + x;
      // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);;
    })
  }

}
