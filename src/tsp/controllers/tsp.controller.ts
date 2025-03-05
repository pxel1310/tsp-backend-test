import { Body, Controller, Post } from '@nestjs/common';
import { TspService } from '../tsp.service';
import { TspSolveResponseDto } from '../dtos/response/solve.response.dto';
import { TspSolveRequestDto } from '../dtos/request/solve.request.dto';
import { TspGenerateCitiesResponseDto } from '../dtos/response/generate-cities.response.dto';
import { TspGenerateCitiesRequestDto } from '../dtos/request/generate-cities.request.dto';

/**
 * The TspController class is a NestJS controller responsible for handling HTTP
 * requests. It provides endpoints for the TSP Service.
 */
@Controller('tsp')
export class TspController {
    constructor(private readonly tspService: TspService) {}

    @Post('solve')
    solve(@Body() payload: TspSolveRequestDto): TspSolveResponseDto {
        return this.tspService.solve(payload);
    }

    @Post('generate-cities')
    generateCities(
        @Body() payload: TspGenerateCitiesRequestDto,
    ): TspGenerateCitiesResponseDto {
        return this.tspService.generateCities(payload);
    }
}
