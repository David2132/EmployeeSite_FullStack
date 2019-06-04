import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditComponent }      from './add-edit/add-edit.component';
import { FormComponent }    from './form/form.component';
import { LoginPageComponent } from './login-page/login-page.component'


const routes: Routes = [{ path: '', redirectTo: '/login-page', pathMatch: 'full' },
{path: 'login-page', component: LoginPageComponent},{ path:"employee-list", component: AddEditComponent },
{ path: 'detail/:id', component: FormComponent }]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
