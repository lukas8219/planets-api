import { BadRequestException, Body, Controller, Get, Header, HttpCode, Param, Post, Query, UnprocessableEntityException } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetCreateDTO } from "src/data/dto/planet.create.dto";
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

}