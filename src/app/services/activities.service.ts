import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Activity } from '../models/models';

@Injectable()
export class ActivityService {
  public url: string;
  public json_header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient){
      this.url = Global.url;
  }

  // Obtiene todas las actividades
  getActivities(): Observable<any>{
    return this._http.get(this.url+'get-activity', {headers: this.json_header});
  }

  // Obtiene la actividad con el id especificado 
  getActivity(id: string): Observable<any>{
    return this._http.get(this.url+'get-activity/'+id, {headers: this.json_header});
  }

  // Guarda una nueva actividad
  saveActivity(activity: Activity): Observable<any>{
    let params = JSON.stringify(activity);
    return this._http.post(this.url+'save-activity',params, {headers: this.json_header});
  }

  // Elimina una actividad 
  deleteActivity(id): Observable<any>{
    return this._http.delete(this.url+'delete-activity/'+id, {headers: this.json_header}); 
}

  // Actualiza una actividad
  updateActivity(activity): Observable<any>{
      let params = JSON.stringify(activity);
      return this._http.put(this.url+'update-activity/'+ activity._id, params, {headers: this.json_header}); 
  }
}