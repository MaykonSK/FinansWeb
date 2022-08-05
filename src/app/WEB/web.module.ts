import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WEBRoutingModule } from './web-routing.module';
import { HomeComponent } from './Home/Home.component';
import { FooterComponent } from './Footer/Footer.component';
import { HeaderComponent } from './Header/Header.component';
import { IndexComponent } from './Index/Index.component';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    WEBRoutingModule
  ]
})
export class WEBModule { }
