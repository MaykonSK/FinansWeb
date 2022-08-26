import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  public infoUsuario: Usuario;

  constructor(private usuario: UsuarioService) {
  }

  ngOnInit() {
    this.recuperarUsuario();
  }

  recuperarUsuario() {
    this.usuario.retornaUsuario().subscribe(user => {
      console.log(user);
      this.infoUsuario = user;
    })
  }

}
