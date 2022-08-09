import { Injectable } from '@angular/core';

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private Token: string = "";

  constructor() { }

  retornaToken() {
    //buscando a KEY, caso venha sem valor, deve retornar em branco
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string) {
    //setar valor para variavel token - setItem(key: string, value: string)
    localStorage.setItem(KEY, token)
  }

  excluiToken() {
    //limpar token
    localStorage.removeItem(KEY)
  }

  possuiToken() {
    //retorna boleano
    return !! this.retornaToken();
  }

}
