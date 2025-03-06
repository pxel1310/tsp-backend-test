import { World, Bounds } from './world';
import { City, Coordinates } from './city';

export class WorldGenerator {
    private readonly ASCII_CHARCODE_A = 65;
    private readonly ENGLISH_ALPHABET_LENGTH = 26;
    private world: World;

    constructor(
        private readonly numOfCities: number,
        private readonly bounds: Bounds,
    ) {
        if (numOfCities > bounds.x * bounds.y) {
            throw new NumOfCitiesExceedWorldBoundsError(numOfCities);
        }

        this.world = new World(this.bounds);
    }

    getWorld(): World {
        return this.world;
    }

    /**
     * Generates and adds a set of cities to the world, ensuring unique names
     * and coordinates for each city.
     *
     * - Resets the world to discard previously generated cities.
     */
    generateCities(): void {
        const ALPHABET = this.generateAlphabet();
        const COORDINATES = this.generateCoordinates();
        this.world = new World(this.bounds);

        for (let i = 0; i < this.numOfCities; i++) {
            this.world.addCity(new City(ALPHABET[i], COORDINATES[i]));
        }
    }

    /**
     * Generates a sequence of unique alphabetical labels for city names.
     * Labels are created using a base-26-like numbering system, where 'A' to
     * 'Z' represent the first 26 entries, followed by combinations like 'AA',
     * 'AB', 'AC', etc.
     *
     * - Example sequence:
     *   1 → 'A', 2 → 'B', ..., 26 → 'Z', 27 → 'AA', 28 → 'AB', ..., 52 → 'AZ', 53 → 'BA'
     */
    private generateAlphabet(): string[] {
        const alphabet: string[] = [];

        const createLabelFromPointer = (pointer: number): string =>
            String.fromCharCode(
                this.ASCII_CHARCODE_A +
                    (pointer % this.ENGLISH_ALPHABET_LENGTH),
            );

        for (let i = 0; i < this.numOfCities; i++) {
            let label = '';
            let pointer = i;

            while (pointer >= 0) {
                label = createLabelFromPointer(pointer) + label;
                pointer =
                    Math.floor(pointer / this.ENGLISH_ALPHABET_LENGTH) - 1;
            }

            alphabet.push(label);
        }

        return alphabet;
    }

    /**
     * Generates a sequence of unique and random coordinates within the defined
     * world bounds.
     */
    private generateCoordinates(): Coordinates[] {
        const coordinatesSet: Coordinates[] = [];

        const spaceInX = this.fisherYatesShuffle(
            Array.from({ length: this.world.bounds.x + 1 }, (_, i) => i),
        );

        const spaceInY = this.fisherYatesShuffle(
            Array.from({ length: this.world.bounds.y + 1 }, (_, i) => i),
        );

        for (let i = 0; i < this.numOfCities; i++) {
            coordinatesSet.push({ x: spaceInX[i], y: spaceInY[i] });
        }

        return coordinatesSet;
    }

    /**
     * Randomly shuffles an array in place using the Fisher-Yates algorithm.
     * Ensures an unbiased, uniform shuffle distribution.
     */
    private fisherYatesShuffle(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}

class NumOfCitiesExceedWorldBoundsError extends Error {
    constructor(numOfCities: number) {
        super(`World's bounds aren’t big enough to fit ${numOfCities} cities.`);
    }
}
