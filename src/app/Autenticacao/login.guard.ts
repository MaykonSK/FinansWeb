import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './Usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //se estiver logado com token, vai redirecionar para o CMS
      if (this.usuarioService.estaLogado()) {
        this.router.navigate(['cms']);
        return false;
      }
    return true;
  }
}
