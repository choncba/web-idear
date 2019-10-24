import { Component, OnInit } from '@angular/core';
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
  private enableEdit: boolean;

  constructor( private login_service: LoginService ){
    this.enableEdit = this.login_service.getUserLoggedIn();
  }

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
  
    //console.log(this.enableEdit?'Menu Edición Activada':'Menu Edición Desactivada');
  }

  logOut(){
    this.login_service.logOut();
    window.location.reload();     // Recargo la página para que los componentes que tienen edición
                                  // lean de nuevo la variable enableEdit
  }
}
