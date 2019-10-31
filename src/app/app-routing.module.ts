import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', component: MainComponent,  pathMatch: 'full'},
  { path: 'admin', component: LoginComponent,  pathMatch: 'full'},
  { path: 'edit/:tipo/:id', component: EditComponent,  pathMatch: 'full'},
  { path: '**', component: ErrorComponent} // Capturo no encontrado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
