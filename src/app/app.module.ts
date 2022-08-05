import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CMSModule } from './CMS/cms.module';
import { WEBModule } from './WEB/web.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    WEBModule,
    CMSModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
