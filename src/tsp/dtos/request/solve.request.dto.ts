import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
    ValidateNested,
} from 'class-validator';

/**
 * Represents the distance between two cities in the TSP problem.
 */
export class TspDistanceRequestDto {
    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    to: string;

    @IsNumber()
    distance: number;
}

/**
 * Defines the request structure for solving the TSP.
 */
export class TspSolveRequestDto {
    @MinLength(2, { each: true })
    cities: string[];

    @ValidateNested()
    distances: TspDistanceRequestDto[];
}
