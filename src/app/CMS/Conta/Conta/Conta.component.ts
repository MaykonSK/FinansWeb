import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';

@Component({
  selector: 'app-Conta',
  templateUrl: './Conta.component.html',
  styleUrls: ['./Conta.component.css']
})
export class ContaComponent implements OnInit {

  formulario: FormGroup;
  selectFile: any;
  imageUrl: any;
  sanitizer: any;

  constructor(private fb: FormBuilder, private service: CmsService) { }

  ngOnInit() {
    this.configurarFormulario();
    this.getImagem();
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

      this.service.uploadFile(formData).subscribe(x => {
        console.log(x);
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
