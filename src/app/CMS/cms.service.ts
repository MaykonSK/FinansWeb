import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContaPagar } from './Models/ContaPagar';
import { GetContasPagar } from './Models/GetContasPagar';

const API = environment.FinansAPI;
const APICEP = "https://viacep.com.br/ws";

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient) { }

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

  recuperarContasPagar() {
    return this.http.get<GetContasPagar[]>(API+"/contaspagar")
  }

  deletarContaPagar(id: number) {
    return this.http.delete(API+"/contaspagar/"+id)
  }

}
