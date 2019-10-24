// Importo métodos necesarios y variables para el servicio con la API del backend
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../services/global';

@Injectable()
export class LoginService{
  public url: string;
  private isUserLoggedIn: boolean;
  //public usserLogged: User;

  constructor(
      private _http: HttpClient
  ){
      this.url = Global.url;
      this.isUserLoggedIn = false;
  }

  testService(): string{
    return 'Probando el Servicio Login';
  }

  testLogin(username:string, password:string) {
    return this._http.post('https://reqres.in/api/login', {
      email: username,
      password: password,     
    });     
  }

  login(username:string, password:string) {
    let data = {
      user: username,
      password: password
    };
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', data, {headers: headers});     
  }

  // setUserLoggedIn(user:User) {
  //   this.isUserLoggedIn = true;
  //   this.usserLogged = user;
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  
  // }

  getUserLoggedIn() {
    let raw_data = localStorage.getItem('userLogged');  // Devuelve null si no encuentra este key
    if(raw_data){
      let json_data = JSON.parse(localStorage.getItem('userLogged'));
      if(json_data.hasOwnProperty('logged')&&json_data.hasOwnProperty('id')){
        this.isUserLoggedIn = json_data.logged;
      }
    }
    return this.isUserLoggedIn;
  }

  logOut(){
    if(this.getUserLoggedIn()){
      localStorage.removeItem('userLogged');
    }
  }
}