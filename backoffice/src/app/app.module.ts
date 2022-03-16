import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { PocionListComponent } from './entities/pocion/pocion-list/pocion-list.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PocionFormComponent } from './entities/pocion/pocion-form/pocion-form.component';
import { FormsModule } from '@angular/forms';
import { PocionListPagedComponent } from './entities/pocion/pocion-list-paged/pocion-list-paged.component';

@NgModule({
  declarations: [
    AppComponent,
    PocionListComponent,
    NavbarComponent,
    HomeComponent,
    PocionFormComponent,
    PocionListPagedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
