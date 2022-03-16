import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PocionListComponent } from './entities/pocion/pocion-list/pocion-list.component';
import { PocionListPagedComponent } from './entities/pocion/pocion-list-paged/pocion-list-paged.component';
import { PocionFormComponent } from './entities/pocion/pocion-form/pocion-form.component';


const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'pociones-list', component: PocionListComponent},
  {path:'pociones-list-paged', component: PocionListPagedComponent},
  {path:'pociones-form', component: PocionFormComponent},
  {path:'pociones-form/:pocionId', component: PocionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
