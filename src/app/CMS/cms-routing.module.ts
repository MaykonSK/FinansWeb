import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../CMS/Home/Home.component';
import { IndexComponent } from './Index/Index.component';
import { ImoveisComponent } from './Patrimonios/Imoveis/Imoveis.component';
import { VeiculosComponent } from './Patrimonios/Veiculos/Veiculos.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent,
    children: [
      {path: "", component: HomeComponent},
      {path: "patrimonio/imoveis", component: ImoveisComponent},
      {path: "patrimonio/veiculos", component: VeiculosComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CMSRoutingModule { }
