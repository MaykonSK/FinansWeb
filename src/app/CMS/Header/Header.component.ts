import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuario: UsuarioService) { }

  ngOnInit() {
  }

  logout() {
    this.usuario.logout();
  }

}
