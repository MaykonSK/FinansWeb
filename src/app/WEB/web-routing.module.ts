import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../WEB/Home/Home.component';
import { CadastroUsuarioComponent } from './Conta/CadastroUsuario/CadastroUsuario.component';
import { LoginUsuarioComponent } from './Conta/LoginUsuario/LoginUsuario.component';
import { IndexComponent } from './Index/Index.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent,
    children: [
      {path: "", component: HomeComponent},
      {path: "login", component: LoginUsuarioComponent},
      {path: "cadastro", component: CadastroUsuarioComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WEBRoutingModule { }
