import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/Autenticacao/Usuario/Usuario';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  public loading: boolean;

  public infoUsuario: Usuario;

  constructor(private usuario: UsuarioService) {
    this.loading = true;
  }

  ngOnInit() {
    this.recuperarUsuario();
  }

  recuperarUsuario() {

    this.usuario.retornaUsuario().subscribe(user => {
        this.infoUsuario = user;
        this.loading = false;
      })

  }

}
