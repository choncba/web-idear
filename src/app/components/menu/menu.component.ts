import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

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
  }
}
