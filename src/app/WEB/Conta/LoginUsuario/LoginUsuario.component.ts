import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-LoginUsuario',
  templateUrl: './LoginUsuario.component.html',
  styleUrls: ['./LoginUsuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: WebService) {}

  ngOnInit() {
  }

  login = this.fb.group({
    Email: [null, [Validators.required, Validators.email]],
    Password: [null, Validators.required]
  })

  LogarUsuario() {
    if (this.login.valid) {
      const dados = this.login.getRawValue();
      this.service.logarUsuario(dados).subscribe(user => {
        console.log(user);
      })
    }
  }


}
