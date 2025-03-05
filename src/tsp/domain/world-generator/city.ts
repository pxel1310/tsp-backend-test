export interface Coordinates {
    x: number;
    y: number;
}

export class City {
    constructor(
        readonly name: string,
        readonly coordinates: Coordinates,
    ) {}
}
