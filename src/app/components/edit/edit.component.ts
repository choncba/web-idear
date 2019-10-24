import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamMember } from '../../models/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ TeamService ]
})
export class EditComponent implements OnInit {
  private tipo: string;
  public url: string;
  public members: TeamMember[];

  constructor(
    private team_service: TeamService,
    private _route: ActivatedRoute
  ) 
  { 
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.tipo = params.tipo;  // Recibo el tipo de edición que deseo realizar, y de paso lo uso para el titulo
    });

    if(this.tipo){
      this.getTeam();
    } 
  }

  // Obtengo los datos de los team members desde el servidor y los almacena en un array del modelo
  getTeam(){
    this.team_service.getTeam().subscribe(
      response => {
        if(response.team_members){
          this.members = response.team_members;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
