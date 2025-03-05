/**
 * Defines the solved response returned when solving the TSP.
 */
export interface TspSolveResponseDto {
    route: string[];
    totalDistance: number;
}
