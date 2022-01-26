export class PlanetListDTO {

    private id : number;
    private name : string

    constructor({
        id, name
    }){
        Object.assign(this, {
            id: id,
            name: name,
        });
    }

}