import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../models/models'
import { TeamService } from '../../services/team.service';
import { Global } from '../../services/global';
import { LoginService } from '../../services/login.service';// Metodos de login

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, LoginService]
})
export class TeamComponent implements OnInit {
  public url: string;
  public members: TeamMember[]; // Array del modelo team member para almacenar los datos del servidor
  public singleMember: TeamMember;
  public enableEdit: boolean;

  constructor( 
    private team_service: TeamService,
    private login_service: LoginService
  ){
    this.url = Global.url;
    this.enableEdit = this.login_service.getUserLoggedIn();
  }

  ngOnInit(){
    this.getTeam(); // Busco todos los Team Members
    this.showSlider();
    //this.getTeamMember('5daa097f6392d44a7b8fc3ff');  // Busco un único Team Member con su id
  }

  showSlider(){
    $(window).on('load', function(){
      $('.team-slider').bxSlider({ // ver https://bxslider.com/examples/image-slideshow-captions/
        mode: 'horizontal',
        pager: false,
        minSlides: 4,
        maxSlides: 4,
        slideMargin: 10,
        infiniteLoop: false,
        hideControlOnEnd: true
      });
  
      // Saco de esta forma el box shadow porque el css del plugin esta en una jerarquía superior
      $('.bx-wrapper').css('box-shadow', 'none');
    });
  }

  // Obtengo los datos de los team members desde el servidor y los almacena en un array del modelo
  getTeam(){
    this.team_service.getTeam().subscribe(
      response => {
        if(response.team_members){
          this.members = response.team_members;
        }
        console.log('Respuesta de TeamMember desde el servidor:');
        console.log(response);
        console.log('TeamMember almacenado en el modelo:');
        console.log(this.members);
        console.log('Se encontraron '+this.members.length+' miembros');
        //this.showSlider();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Obtengo los datos de un únicoteam member desde el servidor y los almaceno en una variable del modelo
  getTeamMember(id:string){
    this.team_service.getTeamMember(id).subscribe(
      response => {
        if(response.team_member){
          this.singleMember = response.team_member;
        }
        console.log('Respuesta de Single TeamMember desde el servidor:');
        console.log(response);
        console.log('Single TeamMember almacenado en el modelo:');
        console.log(this.singleMember);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
