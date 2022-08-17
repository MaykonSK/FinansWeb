import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenSerivce: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenSerivce.possuiToken()) {
      const token = this.tokenSerivce.retornaToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
