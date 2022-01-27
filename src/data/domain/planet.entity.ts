export class Planet {

    private id: Number;

    private name: string;

    private terrain: string;

    constructor(planet : any){
        Object.assign(this,planet);
    }

    getName(){
        return this.name;
    }

    getTerrain(){
        return this.terrain;
    }

    setName(name: string){
        this.name = name;
    }

    setTerrain(terrain: string){
        this.terrain = terrain;
    }

    getId() : Number{
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

}