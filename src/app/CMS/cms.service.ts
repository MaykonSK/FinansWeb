import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../Autenticacao/token.service';
import { ContaPagar } from './Models/ContaPagar';
import { GetContasPagar } from './Models/GetContasPagar';
import { UpdateContaPagar } from './Models/UpdateContaPagar';

const API = environment.FinansAPI;
const APICEP = "https://viacep.com.br/ws";

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  recuperarImoveis(): Observable<any> {
    return this.http.get(API+"/imovel");
  }

  cadastrarImovel(imovel: any) {
    return this.http.post(API+"/imovel", imovel)
  }

  getCep(cep: number): Observable<any> {
    return this.http.get(APICEP+"/" + cep + "/json");
  }

  cadastrarContaPagar(conta: any): Observable<any> {
    return this.http.post(API+"/contaspagar", conta)
  }

  recuperarContasPagar(userId: number) {
    return this.http.get<GetContasPagar[]>(API+"/contaspagar/"+userId)
  }

  deletarContaPagar(id: number) {
    return this.http.delete(API+"/contaspagar/"+id)
  }

  atualizarConta(id: number, conta: ContaPagar): Observable<any> {
    return this.http.put(API+"/contaspagar/"+id, conta)
  }

}
