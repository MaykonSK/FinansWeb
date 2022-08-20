import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../web.service';

@Component({
  selector: 'app-AtivacaoConta',
  templateUrl: './AtivacaoConta.component.html',
  styleUrls: ['./AtivacaoConta.component.css']
})
export class AtivacaoContaComponent implements OnInit {

  private code: any;
  private userId: any;

  mensagem: string = "";

  constructor(private service: WebService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get("UsuarioId");
    this.code = this.route.snapshot.queryParamMap.get("CodigoAtivacao");
    this.ativarConta();
  }

  ativarConta() {
    var encode = this.ajustadoEncodeURIComponent(this.code)
    this.service.ativarConta(this.userId, encode).subscribe(request => {
      console.log(request);
      this.mensagem = request.message
    }, error => {
      this.mensagem = error.error.message;
    })
  }

  ajustadoEncodeURIComponent (str: any) {
    return encodeURIComponent(str).replace(/[!'()*]/, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

}
