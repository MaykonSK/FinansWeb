import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.UsuariosAPI;

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(API+"/cadastro", usuario);
  }

  logarUsuario(usuario: any): Observable<any> {
    return this.http.post(API+"/login", usuario);
  }

  redefinirSenha(dados: any): Observable<any> {
    return this.http.post(API+"/redefinir-senha", dados)
  }

}


