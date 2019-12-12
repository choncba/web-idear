import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from '../../models/models'
import { ActivityService } from '../../services/activities.service';
import { LoginService } from '../../services/login.service';// Metodos de login
import { Global } from '../../services/global';
import { ModalService } from '../../_modal';
import { IMasonryGalleryImage, MasonryGalleryComponent } from 'ngx-masonry-gallery';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  providers: [ActivityService, LoginService, ModalService]
})
export class ActividadesComponent implements OnInit {

  public url: string;
  public activities: Activity[];  // Array del modelo Activity para almacenar los datos del servidor
  public activity: Activity;      // Objeto activity
  public viewActivity: Activity;
  public enableEdit: boolean;
  public years: string[];

  // Me permite observar eventos en el elemento con el tag #masonryGallery
  @ViewChild('masonryGallery', { static: false }) masonryGallery: MasonryGalleryComponent;

  constructor( 
    private activity_service: ActivityService,
    private login_service: LoginService,
    private modalService: ModalService
  ){
    this.enableEdit = this.login_service.getUserLoggedIn();
    this.years = [""];
    this.url = Global.url;
    this.viewActivity = null;
  }

  ngOnInit() {
    this.getActivities();
    //this.showActivities();
  }

  // Obtengo los datos de las actividades desde el servidor y los almacena en un array del modelo
  getActivities(){
    this.activity_service.getActivities().subscribe(
      response => {
        if(response.activities){
          console.log(response.activities);
          this.activities = response.activities;
          this.loadActivities();
          this.showActivities();
          this.years.sort();
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Obtengo los años para el indice y agrego las actividades
  loadActivities(){
    
    for(let i = 0; i<this.activities.length; i++){
      let fecha = this.activities[i].date_activity.substring(0,4); // La fecha se almacena AAAA-MM-DD, extraigo AAAA
      //console.log(fecha);
      if(fecha != "" && fecha != null){
        if(this.years.indexOf(fecha) === -1){
          if(this.years.length == 1){
            this.years[i] = fecha;
          }
          else{
            this.years.push(fecha);
          }
        }
      // Si lo hago con jquery se carga después del CSS :(
      // $('#posts').append(
      //   "<div class='post " + this.years[i] + "'><img src='" + this.url + "get-file/" + this.activities[i].pictures[this.activities[i].front_picture] + "' (load)='showActivies()'/>" +
      //     "<div class='post-content'>" +
      //       "<h2>" + this.years[i] + "</h2>" +
      //       "<p>" + this.activities[i].name + "</p>" +
      //       "<a href='#'>View more</a>" +
      //     "</div>" +
      //   "</div>"
      // );
      } 
    }
    //this.years.sort();  // Ordeno las fechas de menor a mayor para el indice
    //console.log("Years: " + this.years);
  }

  // Muestra las portadas de las actividades según el filtro
  showActivities(){
    $(document).ready(function(){
      $('.hidden').css('display','none');
      $( "#filter button" ).each(function(){
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
            }         
        });  
      });  
    });
  }

  // Abre el popup con el detalle de la actividad
  openModal(id: string, index: number) {
    this.viewActivity = this.activities[index];
    this.modalService.open(id);
  }

  // Cierra el popup
  closeModal(id: string) {
    this.viewActivity = null;
    this.modalService.close(id);
  }

  // Cargo las imágenes de la actividad seleccionada para ,ostrar la galeria Masonry en el popup
  public get masonryPictures(): IMasonryGalleryImage[]{
    let urls = [""];
    for(let i=0; i< this.viewActivity.pictures.length;i++){
      urls[i] = this.url+"get-file/"+this.viewActivity.pictures[i];
    }
    return urls.map(m => <IMasonryGalleryImage>{
      imageUrl: m
    });
  }

  selectPicture(){
    console.log(this.masonryGallery.images);
  }
  
}
