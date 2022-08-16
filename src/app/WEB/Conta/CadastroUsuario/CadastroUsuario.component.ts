import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-CadastroUsuario',
  templateUrl: './CadastroUsuario.component.html',
  styleUrls: ['./CadastroUsuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: WebService) { }

  @Output() Loading: boolean = false;

  mensagem: string = ""

  ngOnInit() {
    this.cadastro
  }

  cadastro = this.fb.group({
    Username: [null, Validators.required],
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required],
    RePassword: [null, Validators.required]
  })

  CadastrarUsuario() {
    if (this.cadastro.valid) {
      this.Loading = true;
      const novoUsuario = this.cadastro.getRawValue(); //getRawValue() recupera todos os dados do formulario cadastro
      this.service.cadastrarUsuario(novoUsuario).subscribe(user => {
        console.log(user)
        this.Loading = false;
      }, error => {
        this.mensagem = "Dados inválido para cadastro"
        this.Loading = false;
      })
    }
  }

}
