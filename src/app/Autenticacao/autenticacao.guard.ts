import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './Usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //se nao estiver logado vai retornar para o home
      if (!this.usuarioService.estaLogado()) {
        this.router.navigate(['']);
        return false;
      }
    return true;
  }
}
