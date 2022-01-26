import { NotFoundException } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity"
import { PaginationDTO } from "src/data/dto/pagination.dto";
import { PlanetCreateDTO } from "src/data/dto/planet.create.dto";
import { PlanetListDTO } from "src/data/dto/planet.list.dto";
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

    async getByName(name :string): Promise<Planet> {
        const result = await this.repository.findByName(name);

        if(!result){
            throw new NotFoundException();
        }

        return result;
    }

    async delete(id : number): Promise<void>{
        return this.repository.deleteById(id);
    }

    async getPaginated(filters): Promise<PaginationDTO<PlanetListDTO>>{
        const results = await this.repository.getAllPaginated(filters)
            .then((array) => array.map((planet) => new PlanetListDTO({
                id: planet.getId(),
                name: planet.getName()
            })));

        return new PaginationDTO({
            data: results,
            ...filters
        })
    }
}