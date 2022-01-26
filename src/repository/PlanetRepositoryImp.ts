import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationParameters } from "src/data/domain/pagination.parameters";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetRepository } from "./PlanetRepository";

@Injectable()
export class PlanetRepositoryImpl implements PlanetRepository {

    constructor(){}

    getAllPaginated(filters: PaginationParameters): Promise<Planet[]> {
        const values = Object.values(this.cache);
        console.log(filters);
        const initial = filters.getPageNumber() * filters.getPageSize();
        const final = initial + filters.getPageSize();
        return Promise.resolve(values.slice(initial, initial + filters.getPageSize()));
    }

    private cache: { [key: number]: Planet} = {};

    async deleteById(id: number): Promise<void> {
        const planet = this.cache[id];

        if(planet){
            delete this.cache[id];
        } else {
            throw new NotFoundException();

        }

        return Promise.resolve();
    }

    findByName(name: string): Promise<Planet> {
        const values = Object.values(this.cache);

        console.log(values);

        console.log(name);



        const planets = values.filter((planet: Planet) => { 

            console.log(planet.getName());

            return planet.getName().toLowerCase() == name.toLowerCase()
        });

        console.log(planets);

        return Promise.resolve(planets[0]);
    }

    async findById(id: number): Promise<Planet> {
        return this.cache[id];
    }

    async save(planet: Planet): Promise<Planet> {
        const id = Math.floor(Math.random() * 500);
        planet.setId(id);
        this.cache[id] = planet;
        return planet;
    }

}