export class Planet {

    private id: number;

    private name: string;

    private terrain: string;

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

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

}