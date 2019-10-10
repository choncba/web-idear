import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
