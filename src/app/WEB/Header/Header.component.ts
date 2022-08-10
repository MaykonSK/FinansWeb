import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  public logado: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.verificaStatus();
  }

  verificaStatus() {
    console.log(this.usuarioService.estaLogado())
    if (this.usuarioService.estaLogado()) {
      this.logado = true;
    } else {
      this.logado = false;
    }

  }

}
