import {Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity";
import { PaginationDTO } from "src/data/dto/pagination.dto";
import { PlanetCreateDTO } from "src/data/dto/planet.create.dto";
import { PlanetListDTO } from "src/data/dto/planet.list.dto";
import { PlanetService } from "src/services/planet.service";

@Controller('/v1/planets')
export class PlanetsApi {

    constructor(private readonly planetsService: PlanetService){}

    @Get(':query')
    async getById(@Param('query') query : Number | String) : Promise<Planet>{

        if(isNaN(Number(query.toString()))){
            return this.planetsService.getByName(query as string);
        } else {
            return this.planetsService.getById(query as number);
        }
        
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: PlanetCreateDTO) : Promise<Planet>{
        return await this.planetsService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void>{
        return await this.planetsService.delete(id);
    }

    @Get()
    async search(@Query('pageNumber') pageNumber : Number = 0,
                 @Query('pageSize') pageSize: number = 5,
                 @Query('sort') sort : string = 'id'): Promise<PaginationDTO<PlanetListDTO>> {
        return await this.planetsService.getPaginated({
            pageNumber: Number(pageNumber),
            pageSize: Number(pageSize),
            sort: sort
        })
    }

}