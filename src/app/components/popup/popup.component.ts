// Componente para mostrar un popup con información
// Ver  https://github.com/cornflourblue/angular-8-custom-modal
//      https://jasonwatmore.com/post/2019/07/12/angular-8-custom-modal-window-dialog-box
import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { PopupService } from './popup.service';

@Component({
  selector: 'popup-view',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private _popupservice: PopupService,
    private _el: ElementRef
  ){
    this.element = _el.nativeElement;
   }

  ngOnInit(): void {
    if(!this.id){ // Verifico que se pase el id del popup
      console.error("No pasaron el id!");
      return;
    }

    // Agrego este elemento al final de la página para que pueda ser mostrado sobre lo demás
    document.body.appendChild(this.element);

    // Cierro el popup al hacer click fuera de el
    this.element.addEventListener('click', el => {
      if(el.target.className === 'popup'){
        this.close();
      }
    });

    // Agrego este popup al servicio
    this._popupservice.add(this);
  }

  // Elimino el popup
  ngOnDestroy(): void{
    this._popupservice.remove(this.id);
    this.element.remove();
  }

  // Abro el popup
  open(): void{
    this.element.style.display = 'block';
    document.body.classList.add('popup-open');
  }

  // Cierro el popup
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('popup-open');
  }

}
