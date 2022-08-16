import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEBRoutingModule } from './web-routing.module';
import { HomeComponent } from './Home/Home.component';
import { FooterComponent } from './Footer/Footer.component';
import { HeaderComponent } from './Header/Header.component';
import { IndexComponent } from './Index/Index.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginUsuarioComponent } from './Conta/LoginUsuario/LoginUsuario.component';
import { CadastroUsuarioComponent } from './Conta/CadastroUsuario/CadastroUsuario.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './Shared/Loading/Loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    LoginUsuarioComponent,
    CadastroUsuarioComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    WEBRoutingModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ]
})
export class WEBModule { }
