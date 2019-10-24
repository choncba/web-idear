import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { TeamMember } from '../models/models';


@Injectable()
export class TeamService {
  public url: string;
  public json_header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient){
      this.url = Global.url;
  }

  // Obtiene todos los team members
  getTeam(): Observable<any>{
    return this._http.get(this.url+'get-team', {headers: this.json_header});
  }

  // Obtiene el team member con el id especificado 
  getTeamMember(id: string): Observable<any>{
    return this._http.get(this.url+'get-team/'+id, {headers: this.json_header});
  }

  saveTeamMember(){

  }

  deleteTeamMember(){

  }

  addTeamMember(){

  }
}
