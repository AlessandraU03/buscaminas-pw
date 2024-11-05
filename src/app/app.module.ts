import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscaminasComponent } from './buscaminas/buscaminas.component';
import { TableroComponent } from './buscaminas/tablero/tablero.component';
import { CeldaComponent } from './buscaminas/celda/celda.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscaminasComponent,
    TableroComponent,
    CeldaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
