import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CMSRoutingModule } from './cms-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './Home/Home.component';
import { FooterComponent } from './Footer/Footer.component';
import { HeaderComponent } from './Header/Header.component';
import { IndexComponent } from './Index/Index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImoveisComponent } from './Patrimonios/Imoveis/Imoveis.component';
import { ModalComponent } from './Shared/modal/modal.component';
import { VeiculosComponent } from './Patrimonios/Veiculos/Veiculos.component';
import { ContasPagarComponent } from './Financeiro/ContasPagar/ContasPagar.component';
import { ContasReceberComponent } from './Financeiro/ContasReceber/ContasReceber.component';
import { NgxMaskModule } from 'ngx-mask';
import { AlertErrorComponent } from './Shared/AlertError/AlertError.component';
import { AlertSuccessComponent } from './Shared/AlertSuccess/AlertSuccess.component';
import { LoadComponent } from './Shared/Load/Load.component';
import { AutenticacaoInterceptor } from '../Autenticacao/autenticacao.interceptor';
import { ContaComponent } from './Conta/Conta/Conta.component';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    ImoveisComponent,
    VeiculosComponent,
    ModalComponent,
    ContasPagarComponent,
    ContasReceberComponent,
    AlertErrorComponent,
    AlertSuccessComponent,
    LoadComponent,
    ContaComponent
  ],
  imports: [
    CommonModule,
    CMSRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    }
  ]
})
export class CMSModule { }
