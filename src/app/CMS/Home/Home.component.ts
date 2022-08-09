import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Autenticacao/Usuario/usuario.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuario: UsuarioService) {
  }

  ngOnInit() {
    this.teste();
  }

  teste() {
    var teste = this.usuario.estaLogado
    console.log(teste)
  }



}
