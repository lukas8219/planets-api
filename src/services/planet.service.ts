import { NotFoundException } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity"
import { PlanetCreateDTO } from "src/data/dto/planet.create.dto";
import { InjectPlanetRepository, PlanetRepository } from "src/repository/PlanetRepository";

export class PlanetService {

    constructor(@InjectPlanetRepository private readonly  repository:PlanetRepository){}

    async create(planet: PlanetCreateDTO): Promise<Planet> {
        const result = new Planet();
        result.setName(planet.name);
        result.setTerrain(planet.terrain);
        return this.repository.save(result);
    }

    async getById(id: number): Promise<Planet> {
        const result = await this.repository.findById(id);

        if(!result){
            throw new NotFoundException();
        }
        
        return result;
    }

}