import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PopupModule } from './components/popup/popup.module';

import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { InstitucionalComponent } from './components/institucional/institucional.component';
import { TeamComponent } from './components/team/team.component';
import { SumateComponent } from './components/sumate/sumate.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { TestimonialesComponent } from './components/testimoniales/testimoniales.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    InstitucionalComponent,
    TeamComponent,
    SumateComponent,
    ActividadesComponent,
    TestimonialesComponent,
    ContactoComponent,
    FooterComponent,
    MenuComponent,
    MapaComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PopupModule
  ],
  providers: [],  // ver https://codingpotions.com/angular-login-sesion
  bootstrap: [AppComponent]
})
export class AppModule { }
