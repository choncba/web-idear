import { Component, OnInit } from '@angular/core';
//import { LoginService } from '../../services/login.service';// Metodos de login

//declare var jQuery:any;
//declare var $:any;
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']//,
  //providers: [LoginService]
})
export class MainComponent implements OnInit {
  //public login_service: LoginService;
  //public enable_edit: boolean;

  constructor(
    //private login_service: LoginService
    private modalService: ModalService
  ) { }

  ngOnInit() {
    //this.checkLogged();                                                           
  }

  //checkLogged(){
    //console.log(this.login_service.getUserLoggedIn());
    //this.enable_edit = this.login_service.getUserLoggedIn();  // Obtiene los datos de usuario logueado desde
                                                              // el local storage
    //console.log(this.enable_edit?'Edición Activada':'Edición Desactivada');
  //}

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
