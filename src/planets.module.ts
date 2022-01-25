import { Module } from '@nestjs/common';
import { PlanetsApi } from './api/planets.api';
import { PlanetRepositoryImpl } from './repository/PlanetRepositoryImp';
import { PlanetService } from './services/planet.service';
import { PLANET_REPOSITORY_PROVIDER } from './repository/PlanetRepository';

@Module({
  imports: [],
  controllers: [PlanetsApi],
  providers: [PlanetService, PLANET_REPOSITORY_PROVIDER]
})
export class PlanetsModule {}
