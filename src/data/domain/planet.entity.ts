export class Planet {

    private _id: number;

    private _name: string;

    private _terrain: string;

    constructor(planet : any){
        Object.assign(this,planet);
    }

    public get name(){
        return this._name;
    }

    public get terrain(){
        return this._terrain;
    }

    public set name(name: string){
        this._name = name;
    }

    public set terrain(terrain: string){
        this._terrain = terrain;
    }

    public get id() : number{
        return this._id;
    }

    public set id(id: number){
        this._id = id;
    }

}