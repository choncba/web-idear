// Servicio que permite crear una ventana emergente con información personalizada

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
//@Injectable()
export class PopupService {
    private popups: any[] = [];

    add(popup: any) {
        // add popup to array of active popups
        this.popups.push(popup);
    }

    remove(id: string) {
        // remove popup from array of active popups
        this.popups = this.popups.filter(x => x.id !== id);
    }

    open(id: string) {
        // open popup specified by id
        const popup = this.popups.find(x => x.id === id);
        popup.open();
    }

    close(id: string) {
        // close popup specified by id
        const popup = this.popups.find(x => x.id === id);
        popup.close();
    }
}