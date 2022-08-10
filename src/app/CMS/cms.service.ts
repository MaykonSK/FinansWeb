import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

}
