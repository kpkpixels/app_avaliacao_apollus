import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './views/usuarios/list-usuarios/list-usuarios.component';
import { EditUsuarioComponent } from './views/usuarios/edit-usuario/edit-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './shared/components/auth/auth.guard';
import { PerfilComponent } from './views/perfil/perfil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'usuario/list', component: ListUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'usuario/new', component: EditUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'usuario/edit/:id', component: EditUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'usuario/perfil', component: PerfilComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
