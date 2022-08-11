import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CMSRoutingModule } from './cms-routing.module';
import { HomeComponent } from './Home/Home.component';
import { FooterComponent } from './Footer/Footer.component';
import { HeaderComponent } from './Header/Header.component';
import { IndexComponent } from './Index/Index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { ImoveisComponent } from './Patrimonios/Imoveis/Imoveis.component';
import { ModalComponent } from './Shared/modal/modal.component';
import { VeiculosComponent } from './Patrimonios/Veiculos/Veiculos.component';
import { ContasPagarComponent } from './Financeiro/ContasPagar/ContasPagar.component';
import { ContasReceberComponent } from './Financeiro/ContasReceber/ContasReceber.component';


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
    ContasReceberComponent
  ],
  imports: [
    CommonModule,
    CMSRoutingModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
  ]
})
export class CMSModule { }
