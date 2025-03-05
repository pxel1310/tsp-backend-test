import { IsNumber } from 'class-validator';

/**
 * Defines the request structure for the city generator.
 */
export class TspGenerateCitiesRequestDto {
    @IsNumber()
    numOfCities: number;

    @IsNumber()
    worldBoundX: number;

    @IsNumber()
    worldBoundY: number;
}
