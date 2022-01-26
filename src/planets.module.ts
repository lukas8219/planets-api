import { Module } from '@nestjs/common';
import { PlanetsApi } from './api/planets.api';
import { PlanetRepositoryImpl } from './repository/PlanetRepositoryImp';
import { PlanetService } from './services/planet.service';
import { PLANET_REPOSITORY_PROVIDER } from './repository/PlanetRepository';
import { PaginationConfig } from './config/PaginationConfig';

@Module({
  imports: [],
  controllers: [PlanetsApi],
  providers: [PlanetService, PLANET_REPOSITORY_PROVIDER, PaginationConfig]
})
export class PlanetsModule {}
