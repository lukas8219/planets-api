import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import e from "express";
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
        const values = Object.values(this.cache);
        console.log(filters);
        const initial = filters.getPageNumber() * filters.getPageSize();
        const final = initial + filters.getPageSize();
        return Promise.resolve(values.slice(initial, initial + filters.getPageSize()));
    }

    private cache: { [key: number]: Planet} = {};

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
                throw new UnprocessableEntityException("Já existe um planeta com este nome")
            }
            throw err;
        }
    }

}