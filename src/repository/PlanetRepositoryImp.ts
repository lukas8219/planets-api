import { Injectable } from "@nestjs/common";
import { platform } from "os";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetRepository } from "./PlanetRepository";

@Injectable()
export class PlanetRepositoryImpl implements PlanetRepository {

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

    private cache: { [key: number]: Planet} = {};

    async findById(id: number): Promise<Planet> {
        return this.cache[id];
    }

    async save(planet: Planet): Promise<Planet> {
        const id = Math.floor(Math.random() * 500);
        planet.setId(id);
        this.cache[id] = planet;
        return planet;
    }

    async findAll(): Promise<Planet[]> {
        throw new Error("Not implemented");
    }

}