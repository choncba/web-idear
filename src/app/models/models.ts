// Modelos de respuesta que nos devuelve el servidor de Backend

// Usuario para login
export class UserLogged{
    constructor(
        public logged: boolean,
        public id: string
    ){}
}

export class TeamMember{
    constructor(
        public _id : string,
        public name : string,
        public position : string,
        public description : string,
        public picture : string,
        public slider_order : number,
        public show : boolean
    ){}
}

export class Activity{
    constructor(
        public _id  : string,
        public date : string,
        public pictures : [],
        public principal_picture : number,
        public title : string, 
        public text : string
    ){}
}
