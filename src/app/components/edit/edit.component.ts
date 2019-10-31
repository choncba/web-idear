import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamMember } from '../../models/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { UploadService } from '../../services/upload.service';    // Servicio para subir archivos

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ TeamService, UploadService ]
})
export class EditComponent implements OnInit {
  private tipo: string;
  private id: string;
  public url: string;
  public member: TeamMember;
  public filesToUpload: Array<File>;  // Array para almacenar las imágenes que se subirán en el browser
  public status: string;
  public member_id: string;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(
    private team_service: TeamService,
    private _route: ActivatedRoute,
    private _uploadService: UploadService
  ) 
  { 
    this.url = Global.url;
    this.member = new TeamMember ('','','','','',0,false);
    this.imgURL = "";
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.tipo = params.tipo;  // Recibo el tipo de edición que deseo realizar, 
                                // y de paso lo uso para el titulo
      this.id = params.id;      // Tambien recibo el id de la BD del miembro a editar, 
                                // o 'new' para crear uno nuevo
      console.log("Tipo: " + this.tipo + " id: " + this.id);
    });

    if(this.tipo == "Equipo"){
      if(this.id != "new")
      {
        this.getMember(this.id);
      }
    } 
  }

  // Obtengo los datos de los team members desde el servidor y los almacena en el modelo
  getMember(id){
    this.team_service.getTeamMember(id).subscribe(
      response => {
        if(response.team_member){
          this.member = response.team_member;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // Método para previsualizar la imágen: https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  preview(files){
    console.log(files);
    if (files.length === 0)
      return;
 
    this.filesToUpload = <Array<File>>files;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      //console.log(this.imgURL);
    }
  }

  saveTeamMember(){
    this.team_service.saveTeamMember(this.member).subscribe(
      response => {
        console.log(response);
        if(response.member){
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.member._id, [], this.filesToUpload, 'image').then((result:any) => {
              console.log(result);
              this.member_id = result.member;
              this.status = 'success';
            });
          }
          else{
            this.status = 'success';
            this.member_id = response.member;
          }
        }
        else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
