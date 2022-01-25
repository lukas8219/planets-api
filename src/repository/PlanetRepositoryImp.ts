import { Injectable } from "@nestjs/common";
import { platform } from "os";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetRepository } from "./PlanetRepository";

@Injectable()
export class PlanetRepositoryImpl implements PlanetRepository {

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