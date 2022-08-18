import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../Autenticacao/login.guard';
import { HomeComponent } from '../WEB/Home/Home.component';
import { CadastroUsuarioComponent } from './Conta/CadastroUsuario/CadastroUsuario.component';
import { EsqueciMinhaSenhaComponent } from './Conta/EsqueciMinhaSenha/EsqueciMinhaSenha.component';
import { LoginUsuarioComponent } from './Conta/LoginUsuario/LoginUsuario.component';
import { RedefinirSenhaComponent } from './Conta/Redefinir-senha/Redefinir-senha.component';
import { IndexComponent } from './Index/Index.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent,
    children: [
      {path: "", component: HomeComponent},
      {path: "login", component: LoginUsuarioComponent, canActivate: [LoginGuard]},
      {path: "cadastro", component: CadastroUsuarioComponent, canActivate: [LoginGuard]},
      {path: "redefinir-senha", component: RedefinirSenhaComponent, canActivate: [LoginGuard]},
      {path: "novasenha", component: EsqueciMinhaSenhaComponent, canActivate: [LoginGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WEBRoutingModule { }
