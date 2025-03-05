import { Injectable, NotImplementedException } from '@nestjs/common';
import { TspSolveResponseDto } from './dtos/response/solve.response.dto';
import { TspSolveRequestDto } from './dtos/request/solve.request.dto';
import { TspGenerateCitiesResponseDto } from './dtos/response/generate-cities.response.dto';
import { WorldGenerator } from './domain/world-generator/world-generator';
import { TspGenerateCitiesRequestDto } from './dtos/request/generate-cities.request.dto';

/**
 * The TspService class is a NestJS service responsible for implementing the
 * core logic of solving the Traveling Salesman Problem (TSP) and generating
 * random city coordinates.
 */
@Injectable()
export class TspService {
    solve(payload: TspSolveRequestDto): TspSolveResponseDto {
        void payload;
        throw new NotImplementedException(
            `${this.solve.name} method not implemented in ${TspService.name}`,
        );

        // To do
        // - Implement TSP solver
    }

    generateCities(
        payload: TspGenerateCitiesRequestDto,
    ): TspGenerateCitiesResponseDto {
        const worldGenerator = new WorldGenerator(payload.numOfCities, {
            x: payload.worldBoundX,
            y: payload.worldBoundY,
        });

        worldGenerator.generateCities();

        // To do
        // - Calculate distance between cities

        throw new NotImplementedException(
            `${this.generateCities.name} method not implemented in ${TspService.name}`,
        );
    }
}
