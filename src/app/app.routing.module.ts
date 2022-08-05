import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./WEB/web.module').then(m => m.WEBModule)},
  {path: 'cms', loadChildren: () => import('./CMS/cms.module').then(m => m.CMSModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
