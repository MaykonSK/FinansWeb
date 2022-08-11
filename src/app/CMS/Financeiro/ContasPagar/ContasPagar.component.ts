import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../../cms.service';
import { ContaPagar } from '../../Models/ContaPagar';

@Component({
  selector: 'app-ContasPagar',
  templateUrl: './ContasPagar.component.html',
  styleUrls: ['./ContasPagar.component.css']
})
export class ContasPagarComponent implements OnInit {

  title = "Contas a pagar"

  conta: FormGroup;

  constructor(private service: CmsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.conta = this.fb.group<any>({
      Descricao: [null, Validators.required],
      Valor: [null, Validators.required],
      Vencimento: [null, Validators.required],
      Tipo: [null, Validators.required]
    })
  }

  cadastrarConta() {
    if (this.conta.valid) {
      this.service.cadastrarContaPagar().subscribe()
    }
  }

}
