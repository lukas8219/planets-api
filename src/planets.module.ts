import { Module } from '@nestjs/common';
import { PlanetsApi } from './api/planets.api';
import { PlanetService } from './services/planet.service';
import { PLANET_REPOSITORY_PROVIDER } from './repository/PlanetRepository';
import { PaginationConfig } from './config/PaginationConfig';
import { Database } from './repository/Database';

@Module({
  imports: [],
  controllers: [PlanetsApi],
  providers: [PlanetService, PLANET_REPOSITORY_PROVIDER, PaginationConfig, Database]
})
export class PlanetsModule {}
