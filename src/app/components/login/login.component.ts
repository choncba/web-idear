// VER https://codingpotions.com/angular-login-sesion

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged } from '../../models/models';
import { LoginService } from '../../services/login.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public user_logged: UserLogged;
  public url: string;

  constructor(
    private loginservice: LoginService,
    private router: Router
  ){ 
    this.url = Global.url;
  }

  ngOnInit() {
    // this.Test();
    
    // // Prueba respuesta OK
    // this.loginservice.testLogin('eve.holt@reqres.in', 'cityslicka').subscribe(
    //   res => {
    //     console.log(res);      
    // });

    // // Prueba respuesta error
    // this.loginservice.testLogin('choncba@gmail.com', 'blablabla').subscribe(
    //   res => {
    //     console.log(res);      
    // });
  }

  Test(){
    let respuesta: string;
    respuesta = this.loginservice.testService();
    console.log(respuesta);
  }

  logIn(username: string, password: string) {
    
    // Calls service to login user to the api rest
    this.loginservice.login(username, password).subscribe(

      res => {
        console.log('Respuesta del server: ' + res);
        if(res){
          this.user_logged = <any>res;
          if(this.user_logged.logged == true){
            localStorage.setItem('userLogged', JSON.stringify(this.user_logged));
            console.log('Login OK! - usuario: ' + username + ' ID: ' + this.user_logged.id);
            this.navigate();
          }
          else{
            this.user_logged.logged = false;
            this.user_logged.id = "";
            localStorage.setItem('userLogged', JSON.stringify(this.user_logged));
            console.log('Usuario/Contraseña - NO válido');
            alert('Usuario/Contraseña - NO válido');
          }
        }
      },
      error => { console.error(<any>error); }
    );
  }

  navigate() {
    this.router.navigateByUrl('/');
  }
}
