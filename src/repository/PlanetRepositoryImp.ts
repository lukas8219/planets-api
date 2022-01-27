import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaginationParameters } from "src/data/domain/pagination.parameters";
import { Planet } from "src/data/domain/planet.entity";
import { Database } from "./Database";
import { PlanetRepository } from "./PlanetRepository";

@Injectable()
export class PlanetRepositoryImpl implements PlanetRepository {

    private db;

    constructor(database : Database){
        this.db = database.getPlanetDatabase();
    }

    getAllPaginated(filters: PaginationParameters): Promise<Planet[]> {
        return this.getPaginated(filters);
    }

    async getPaginated(filters : PaginationParameters) : Promise<Planet[]>{
        const initial = filters.getPageNumber() * filters.getPageSize();
        var orderBy = {};
        orderBy[filters.getSort()] = 'asc';

        const result = await this.db.findMany({
            orderBy: orderBy,
            skip: initial,
            take: filters.getPageSize(),
            select: {
                id: true,
                name: true
            }
        });

        return result.map((item) => new Planet({...item}));

    }

    async deleteById(id: number): Promise<void> {
        try{
            await this.db.delete({
                where: {
                    id: Number(id)
                }
            })
            return Promise.resolve();
        } catch (err){
            throw new NotFoundException();
        }
    }

    async findByName(name: string): Promise<Planet> {
    
        const result = await this.db
            .findUnique({
                where: {
                    name: name
                },
                select:{
                    id: true,
                    name: true,
                    terrain: true
                }
            });

        if(!result){
            return undefined;
        }

        return new Planet({...result});
    }

    async findById(id: number): Promise<Planet> {
        const result = await this.db.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                terrain: true
            }
        });

        if(!result){
            return undefined;
        }

        return new Planet({...result});
    }

    async save(planet: Planet): Promise<Planet> {
        try {
            let result;
            if(planet.getId() === undefined){
                    result = await this.db.create({
                        data:{
                            name: planet.getName(),
                            terrain: planet.getTerrain()
                        }
                    })
            } else {
                result = await this.db.update({
                    where: {
                        id: planet.getId() as number
                    },
                    data:{
                        name: planet.getName(),
                        terrain: planet.getTerrain()
                    }
                })
            }
            return new Planet({...result});
        } catch(err){
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'){
                throw new UnprocessableEntityException("There's already a planet with this name")
            }
            throw err;
        }
    }

}