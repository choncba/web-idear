import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamMember, Activity } from '../../models/models';
import { ActivityService } from '../../services/activities.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { UploadService } from '../../services/upload.service';    // Servicio para subir archivos
import { IMasonryGalleryImage } from 'ngx-masonry-gallery'; // https://github.com/Enngage/ngx-masonry-gallery

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ TeamService, UploadService, ActivityService ]
})
export class EditComponent implements OnInit{
  //private tipo: string;
  //private id: string;
  public tipo: string;
  public id: string;
  public url: string;
  public member: TeamMember;
  public activity: Activity;
  public filesToUpload: Array<File>;  // Array para almacenar las imágenes que se subirán en el browser
  public status: string;
  
  public imagePath;
  imgURL: any;
  imgURL_list: any[];
  public message: string;

  public images: IMasonryGalleryImage[];

  constructor(
    private team_service: TeamService,
    private activity_service: ActivityService,
    private _route: ActivatedRoute,
    private _uploadService: UploadService,
    private router: Router
  ) 
  { 
    this.url = Global.url;
    this.member = new TeamMember ('','','','','',0,false);
    this.activity = new Activity ("","","","","",0);
    this.imgURL = "";
    this.imgURL_list = [""];
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.tipo = params.tipo;  // Recibo el tipo de edición que deseo realizar, 
                                // y de paso lo uso para el titulo
      this.id = params.id;      // Tambien recibo el id de la BD del miembro a editar, 
                                // o 'new' para crear uno nuevo
      //console.log("Tipo: " + this.tipo + " id: " + this.id);
    });

    if(this.tipo == "Equipo"){
      if(this.id != "new")
      {
        this.getMember(this.id);
      }
    }

    if(this.tipo == "Actividades"){
      if(this.id != "new")
      {
        this.getActivity(this.id);
      }
    }

  }

  // crop(){
  //   let image = document.getElementById("image");
  //   //console.log(image);
  //   new Cropme(image,
  //     {
  //       "container": {
  //         "width": "100%",
  //         "height": 300
  //       },
  //       "viewport": {
  //         "width": 250,
  //         "height": 200,
  //         "type": "square",
  //         "border": {
  //           "width": 2,
  //           "enable": true,
  //           "color": "#fff"
  //         }
  //       },
  //       "zoom": {
  //         "enable": true,
  //         "mouseWheel": true,
  //         "slider": true
  //       },
  //       "rotation": {
  //         "slider": true,
  //         "enable": true,
  //         "position": "left"
  //       },
  //       "transformOrigin": "viewport"
  //     }
  //   );
  // }

  // cut(){
  //   let image = $('image').Cropme();
  //   let position = image.Cropme('position');
  //   console.log(position);
  // }

  // Obtengo los datos de los team members desde el servidor y los almacena en el modelo
  
  getMember(id){
    this.team_service.getTeamMember(id).subscribe(
      response => {
        if(response.team_member){
          this.member = response.team_member;
          this.imgURL = this.url + 'get-file/' + this.member.picture;
          //console.log(this.imgURL);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Método para previsualizar la imágen: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  preview(files){
    console.log(files);

    if (files.length === 0)
      return;
 
    this.filesToUpload = files;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) =>{ 
      this.imgURL = reader.result; 
      console.log(reader.result);
    }
  }

  // Ver https://developer.mozilla.org/es/docs/Web/API/File/Using_files_from_web_applications
  previewFiles(files) {
    this.filesToUpload = files;
    var preview = document.getElementById("preview");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /image.*/;
      
      if (!file.type.match(imageType)) {
        continue;
      }
      
      var img = document.createElement("img");
      img.style.maxHeight = "200px";
      img.style.padding = '10px';
      //img.classList.add("preview_img");
      // img.file = file; // VER ESTO
      // img.src = file;
      preview.appendChild(img);
      
      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }
  }

  // masonryPreview(files){
  //   this.filesToUpload = files;
    
  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];
  //     var imageType = /image.*/;
      
  //     if (!file.type.match(imageType)) {
  //       continue;
  //     }
      
  //     this.images[i].imageUrl
      
  //     var reader = new FileReader();
  //     reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  //     reader.readAsDataURL(file);
  //   }
  // }

  saveTeamMember(){
    if(this.filesToUpload){
      // Subo primero la imágen
      this._uploadService.makeFileRequest(Global.url+"upload-file", [], this.filesToUpload, 'file').then((result:any) => {
        // La imágen se almacena en el server y en la BD
        this.member.picture = result.files._id; // Obtengo el ID de la imágen en la BD y lo cargo en la imágen del miembro
        // Subo ahora la información del miembro
        this.team_service.saveTeamMember(this.member).subscribe(
        response => {
          if(response.member){
            this.status = "success";
            alert(response.member.name + " ha sido guardado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
        });
      });
    }
    else{
      alert("Debe agregar una imágen");
    }
  }

  updateTeamMember(){
    
    if(this.filesToUpload){
      // Subo primero la imágen
      this._uploadService.makeFileRequest(Global.url+"upload-file", [], this.filesToUpload, 'file').then((result:any) => {
        // La imágen se almacena en el server y en la BD
        this.member.picture = result.files._id; // Obtengo el ID de la imágen en la BD y lo cargo en la imágen del miembro
        // Subo ahora la información del miembro
        this.team_service.updateTeamMember(this.member).subscribe(
        response => {
          if(response.member){
            this.status = "success";
            alert(response.member.name + " ha sido actualizado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
        });
      });
    }
    else{
      // No necesito subir imágenes, actualizo sólo el miembro
      this.team_service.updateTeamMember(this.member).subscribe(
        response => {
          if(response.member){
            this.status = "success";
            alert(response.member.name + " ha sido actualizado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
        }
      );
    }
  }

  deleteTeamMember(){
    let check = confirm("Va a borrar el miembro " + this.member.name + ", ¿Está seguro?");
    if(check){
      this.team_service.deleteTeamMember(this.member._id).subscribe(
        response => {
          if(response.member){
            alert(this.member.name + " ha sido eliminado");
          }
        },
        error => {
          console.log(<any>error);
          alert("Hubo un error al borrar " + this.member.name + " intente más tarde");
        }
      );
      this.navigateHome();
    }
  }

  getActivity(id){
    this.activity_service.getActivity(id).subscribe(
      response => {
        if(response.activity){
          this.activity = response.activity;
          for(let i = 0; i<this.activity.pictures.length; i++){
            this.imgURL_list[i] = this.url + 'get-file/' + this.activity.pictures[i];
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  saveActivity(){
    if(this.filesToUpload){
      // Subo primero la imágen
      this._uploadService.makeFileRequest(Global.url+"upload-file", [], this.filesToUpload, 'file').then((result:any) => {
        // La/s imágen/es se almacena/n en el server y en la BD
        console.log(result.files);
        var respuesta = result.files;
        var resp = [];
        for(let i = 0; i< respuesta.length; i++){
          resp[i] = respuesta[i]._id as string;   // Obtengo un array con el/los ID de la/s imágen/s en la BD 
        }
        this.activity.pictures = JSON.stringify(resp); // y lo cargo en las imagenes de la actividad como un array JSON
        console.log(this.activity.pictures);
        
        // Subo ahora la información de la actividad
        this.activity_service.saveActivity(this.activity).subscribe(
        response => {
          if(response.activity){
            this.status = "success";
            alert(response.activity.name + " ha sido guardado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
        });
      });
    }
    else{
      alert("Debe agregar una imágen");
    }
  }

  updateActivity(){
    
    if(this.filesToUpload){
      // Subo primero la imágen
      this._uploadService.makeFileRequest(Global.url+"upload-file", [], this.filesToUpload, 'file').then((result:any) => {
        // La/s imágen/es se almacena/n en el server y en la BD
        //console.log(result.files);
        var respuesta = result.files;
        var resp = [];
        for(let i = 0; i< respuesta.length; i++){
          resp[i] = respuesta[i]._id as string;   // Obtengo un array con el/los ID de la/s imágen/s en la BD 
        }
        this.activity.pictures = JSON.stringify(resp); // y lo cargo en las imagenes de la actividad como un array JSON
        //console.log(this.activity.pictures);
        
        // Subo ahora la información de la actividad
        this.activity_service.updateActivity(this.activity).subscribe(
        response => {
          if(response.activity){
            this.status = "success";
            alert(response.activity.name + " ha sido guardado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
        });
      });
    }
    else{
      // No necesito subir imágenes, actualizo sólo la actividad
      this.activity.pictures = JSON.stringify(this.activity.pictures);  // RECORDAR pasar siempre como JSON
      this.activity_service.updateActivity(this.activity).subscribe(
        response => {
          if(response.activity){
            this.status = "success";
            alert(response.activity.name + " ha sido guardado correctamente");
            this.navigateHome();
          } 
          else{
            this.status = "failed";
            alert("No pudieron guardarse los cambios, intente más tarde");
          } 
        },
        error => {
          console.log(<any>error);
          alert("No pudieron guardarse los cambios, intente más tarde");
      });
    }
  }

  deleteActivity(){
    let check = confirm("Va a borrar la actividad " + this.activity.name + ", ¿Está seguro?");
    if(check){
      this.activity_service.deleteActivity(this.activity._id).subscribe(
        response => {
          if(response.activity){
            alert(this.activity.name + " ha sido eliminado");
          }
        },
        error => {
          console.log(<any>error);
          alert("Hubo un error al borrar " + this.member.name + " intente más tarde");
        }
      );
      this.navigateHome();
    }
  }
  
  // Elijo la imagen frontal de la actividad
  selectPicture(num: number){
    // for(let i = 0; i<this.activity.pictures.length; i++){
    //   if(document.getElementById('image'+ i.toString()).classList.contains("selected")){
    //     document.getElementById('image'+ i.toString()).classList.remove("selected");
    //   }
    // }
    // document.getElementById('image'+ num.toString()).classList.add("selected");
    // Lo hago solo con [ngClass]="{'selected': activity.front_picture == i}" en el HTML
    this.activity.front_picture = num;
    //console.log("Se seleccionó " + num + " con el id " + this.activity.pictures[num]);
  }

  navigateHome(){
    this.router.navigateByUrl('/');
  }
}
