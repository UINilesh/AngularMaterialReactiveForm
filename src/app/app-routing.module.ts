import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormcomponentComponent } from './formcomponent/formcomponent.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path:'', component:FormcomponentComponent
  },
  {
    path:'login', component:LogInComponent
  },
   {
    path:'register', component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
