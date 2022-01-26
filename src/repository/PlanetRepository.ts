import { Inject } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetRepositoryImpl } from "./PlanetRepositoryImp";

export interface PlanetRepository {

    findById(id: number): Promise<Planet>

    findByName(name : string): Promise<Planet>

    findAll(): Promise<Planet[]>

    save(planet: Planet): Promise<Planet>

    deleteById(id : number): Promise<void>
    

    getAllPaginated(filters) : Promise<Array<Planet>>


}

const IPlanetRepository = Symbol("PlanetRepository");
export const InjectPlanetRepository = Inject(IPlanetRepository);

export const PLANET_REPOSITORY_PROVIDER = {
    provide: IPlanetRepository,
    useClass: PlanetRepositoryImpl
}