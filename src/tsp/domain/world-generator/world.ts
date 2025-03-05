import { City, Coordinates } from './city';

export interface Bounds {
    x: number;
    y: number;
}

export class World {
    private readonly citiesSet: City[] = [];
    readonly bounds: Bounds;

    constructor(bounds: Bounds) {
        const areBoundsNegative = bounds.x < 0 || bounds.y < 0;

        if (areBoundsNegative) {
            throw new NegativeBoundsError(bounds);
        }

        this.bounds = bounds;
    }

    get cities(): City[] {
        return [...this.citiesSet];
    }

    /**
     * Attempts to add a city to the world's set of cities.
     *
     * - A city is considered a duplicate if it shares the same name or
     *   has the same x or y coordinate as an existing city.
     * - If a duplicate is found, the method returns `false` and the city
     *   is not added.
     * - Otherwise, the city is added to the set and the method returns `true`.
     */
    addCity(city: City): boolean {
        const isOutOfBounds =
            city.coordinates.x < 0 ||
            city.coordinates.y < 0 ||
            city.coordinates.x > this.bounds.x ||
            city.coordinates.y > this.bounds.y;

        if (isOutOfBounds) {
            throw new OutOfBoundsError(
                city.name,
                city.coordinates,
                this.bounds,
            );
        }

        const isInSet = this.citiesSet.some(
            (cityInSet) =>
                cityInSet.name === city.name ||
                cityInSet.coordinates.x === city.coordinates.x ||
                cityInSet.coordinates.y === city.coordinates.y,
        );

        return !isInSet && !!this.citiesSet.push(city);
    }
}

class OutOfBoundsError extends Error {
    constructor(cityName: string, coordinates: Coordinates, bounds: Bounds) {
        super(
            `Attempted to add city ${cityName} at coordinates ` +
                `(${coordinates.x}, ${coordinates.y}) which are out of world ` +
                `bounds. Bounds are X: 0 to ${bounds.x}, Y: 0 to ${bounds.y}.`,
        );
    }
}

class NegativeBoundsError extends Error {
    constructor(bounds: Bounds) {
        super(
            `Expected positive bounds to instantiate Wold, but received X: ` +
                `${bounds.x}, Y: ${bounds.y}`,
        );
    }
}
