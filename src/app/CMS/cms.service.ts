import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../Autenticacao/token.service';
import { ContaPaga } from './Models/ContaPaga';
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

  //Imoveis

  recuperarImoveis(userId: number): Observable<any> {
    return this.http.get(API+"/imoveis/"+userId);
  }

  cadastrarImovel(imovel: any) {
    return this.http.post(API+"/imoveis", imovel)
  }

  //Contas a pagar

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

  contaPaga(id: number, conta: ContaPaga): Observable<any> {
    return this.http.put(API+"/contapaga/"+id, conta)
  }

  totalContas(userId: number): Observable<any>  {
    return this.http.get(API+"/totalconta/"+userId)
  }

  //Upload files
  uploadFile(file: FormData): Observable<any> {
    return this.http.post(API+"/upload", file, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getImg(): Observable<any> {
    return this.http.get(API+"/ImgProfile")
  }

}
