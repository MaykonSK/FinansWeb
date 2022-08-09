import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './Autenticacao/autenticacao.guard';
import { LoginGuard } from './Autenticacao/login.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./WEB/web.module').then(m => m.WEBModule)},
  {path: 'cms', loadChildren: () => import('./CMS/cms.module').then(m => m.CMSModule), canLoad: [AutenticacaoGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
