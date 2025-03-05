/**
 * Represents the distance between two cities in the TSP problem.
 */
export interface TspDistanceResponseDto {
    from: string;
    to: string;
    distance: number;
}

/**
 * Defines the response for generating a random set of cities along with
 * their distances.
 */
export interface TspGenerateCitiesResponseDto {
    cities: string[];
    distances: TspDistanceResponseDto[];
}
