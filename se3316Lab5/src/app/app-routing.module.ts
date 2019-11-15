import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SitemanagerComponent } from './sitemanager/sitemanager.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'Register', component:RegisterComponent},
  {path: 'Sitemanager', component:SitemanagerComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
