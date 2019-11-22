import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/models'
import { ActivityService } from '../../services/activities.service';
import { LoginService } from '../../services/login.service';// Metodos de login

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  providers: [ActivityService, LoginService]
})
export class ActividadesComponent implements OnInit {

  public url: string;
  public activities: Activity[];  // Array del modelo Activity para almacenar los datos del servidor
  public activity: Activity;      // Objeto activity
  public enableEdit: boolean;

  constructor( 
    private activity_service: ActivityService,
    private login_service: LoginService
  ){
    this.enableEdit = this.login_service.getUserLoggedIn();
  }

  ngOnInit() {
    this.getActivities();
    this.showActivities();
  }

  // Obtengo los datos de las actividades desde el servidor y los almacena en un array del modelo
  getActivities(){
    this.activity_service.getActivities().subscribe(
      response => {
        if(response.activities){
          this.activities = response.activities;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  showActivities(){
    $(document).ready(function(){

      $('.hidden').css('display','none');
    
      $( "#filter button" ).each(function() {
    
        $(this).on("click", function(){
    
             var filter = $(this).attr('class');         
    
          if ( $(this).attr('class') == 'all' ) {
             $('.hidden').contents().appendTo('#posts').hide().show('slow');
             $( "#filter button" ).removeClass('active');
             $(this).addClass('active');
             $("#filter button").attr("disabled", false);
             $(this).attr("disabled", true);
          }
          else {
             $('.post').appendTo('.hidden');
             $('.hidden').contents().appendTo('#posts').hide().show('slow');
             $('.post:not(.' + filter + ')').appendTo('.hidden').hide('slow');
             $( "#filter button" ).removeClass('active');
             $(this).addClass('active');
             $("#filter button").attr("disabled", false);
             $(this).attr("disabled", true);
          };
          
          });
    
      });
    
    });
  }

}
