import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { UsuarioService } from './Usuario/usuario.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenSerivce: TokenService, private usuarioService: UsuarioService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenSerivce.possuiToken()) {
      const token = this.tokenSerivce.retornaToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
    }
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          // desloga o usuário caso o token da API tenha expirado.
          this.usuarioService.logout();
      }
      return throwError(err);
  }));
  }
}
