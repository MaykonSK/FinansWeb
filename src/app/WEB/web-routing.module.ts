import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../WEB/Home/Home.component';
import { IndexComponent } from './Index/Index.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent,
    children: [
      {path: "", component: HomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WEBRoutingModule { }
