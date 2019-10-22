// Modelos de respuesta que nos devuelve el servidor de Backend

// Usuario para login
export class UserLogged{
    constructor(
        public logged: boolean,
        public id: string
    ){}
}

// Imágenes del slider principal
export class SliderImages{
    constructor(
        public _id: string,
        public name: string,
        public type: string,
        public widh: number,
        public height: number,
        public location: string,
        public order: number
    ){}
}
