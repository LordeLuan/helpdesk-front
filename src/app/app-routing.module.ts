import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path: 'login', component: LoginComponent},

  { path: '' , component: NavbarComponent, canActivate: [AuthGuard] , children:[
    {path: 'home' , component: HomeComponent},
    {path: 'tecnicos', component: TecnicoListComponent},
    {path: 'tecnicos/create', component: TecnicoCreateComponent},
    {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
