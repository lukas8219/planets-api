import { Body, Controller, Get, Header, HttpCode, Param, Post } from "@nestjs/common";
import { Planet } from "src/data/domain/planet.entity";
import { PlanetCreateDTO } from "src/data/dto/planet.create.dto";
import { PlanetService } from "src/services/planet.service";
import { debug } from "util";

@Controller('/v1/planets')
export class PlanetsApi {
    constructor(private readonly planetsService: PlanetService){}


    @Get(':id')
    async getById(@Param('id') id : number) : Promise<Planet>{
        return this.planetsService.getById(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() dto: PlanetCreateDTO) : Promise<Planet>{
        console.log(dto);
        return await this.planetsService.create(dto);
    }

}