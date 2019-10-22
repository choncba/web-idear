import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';// Metodos de login

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [LoginService]
})
export class MenuComponent implements OnInit {

  @Input() enableEdit: boolean; // Importo la variable desde menu.component.ts para verificar si se habilita la edicion

  constructor(
    private login_service: LoginService
  ) { }

  ngOnInit() {
    // Utilizo jQuery para hacer los scrolls del menu
    $("#_inicio").click(function(){
      $('html, body').animate({
        scrollTop: $(".inicio").offset().top
      }, 1000);
    });

    $("#_institucional").click(function(){
      $('html, body').animate({
        scrollTop: $(".institucional").offset().top - 100
      }, 1000);
    });

    $("#_equipo").click(function(){
      $('html, body').animate({
        scrollTop: $(".equipo").offset().top - 100
      }, 1000);
    });

    $("#_actividades").click(function(){
      $('html, body').animate({
        scrollTop: $(".actividades").offset().top - 100
      }, 1000);
    });

    $("#_consultanos").click(function(){
      $('html, body').animate({
        scrollTop: $(".consultanos").offset().top - 100
      }, 1000);
    });
  
    console.log(this.enableEdit?'Menu Edición Activada':'Menu Edición Desactivada');
  }

  logOut(){
    this.login_service.logOut();
    this.enableEdit = false;
  }
}
