import { World, type Bounds } from './world'
import { City, type Coordinates } from './city'

/**
 * Generador de mundos que crea conjuntos aleatorios de ciudades
 * con nombres únicos y coordenadas distribuidas aleatoriamente.
 *
 * Esta clase es responsable de generar escenarios de prueba para
 * el problema TSP, creando ciudades con nombres alfabéticos únicos
 * y coordenadas aleatorias dentro de límites especificados.
 *
 * Características:
 * - Nombres de ciudades usando sistema base-26 (A, B, ..., Z, AA, AB, ...)
 * - Coordenadas únicas generadas aleatoriamente
 * - Validación de límites del mundo
 * - Algoritmo Fisher-Yates para distribución uniforme
 *
 * @class WorldGenerator
 * @author Ian Ayala González
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * const generator = new WorldGenerator(5, { x: 100, y: 100 });
 * generator.generateCities();
 * const world = generator.getWorld();
 * console.log(world.cities); // [City('A', {x: 23, y: 67}), ...]
 */
export class WorldGenerator {
  private readonly ASCII_A = 65
  private readonly ALPHABET_LEN = 26
  private world: World

  constructor(
    private readonly numOfCities: number,
    private readonly bounds: Bounds,
  ) {
    const maxCapacity = (bounds.x + 1) * (bounds.y + 1)
    if (numOfCities > maxCapacity) {
      throw new NumOfCitiesExceedWorldBoundsError(numOfCities)
    }

    this.world = new World(bounds)
  }

  /** Retorna el mundo actual */
  getWorld(): World {
    return this.world
  }

  /** Genera ciudades con nombres y coordenadas únicas */
  generateCities(): void {
    const names = this.generateCityNames()
    const coords = this.generateUniqueCoordinates()
    this.world = new World(this.bounds)

    for (let i = 0; i < this.numOfCities; i++) {
      this.world.addCity(new City(names[i], coords[i]))
    }
  }

  /** Genera nombres únicos estilo Excel: A-Z, AA, AB... */
  private generateCityNames(): string[] {
    const toLabel = (n: number): string =>
      n < 0
        ? ''
        : toLabel(Math.floor(n / this.ALPHABET_LEN) - 1) +
          String.fromCharCode(this.ASCII_A + (n % this.ALPHABET_LEN))

    return Array.from({ length: this.numOfCities }, (_, i) => toLabel(i))
  }

  /** Genera coordenadas únicas dentro de los límites del mundo */
  private generateUniqueCoordinates(): Coordinates[] {
    const xs = this.fisherYatesShuffle(
      Array.from({ length: this.bounds.x + 1 }, (_, i) => i),
    )
    const ys = this.fisherYatesShuffle(
      Array.from({ length: this.bounds.y + 1 }, (_, i) => i),
    )

    return Array.from({ length: this.numOfCities }, (_, i) => ({
      x: xs[i],
      y: ys[i],
    }))
  }

  /** Mezcla un array usando el algoritmo Fisher-Yates */
  private fisherYatesShuffle<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ value }) => value)
  }
}

/**
 * Error cuando el número de ciudades excede la capacidad del mundo
 */
class NumOfCitiesExceedWorldBoundsError extends Error {
  constructor(numOfCities: number) {
    super(`Los límites del mundo no permiten generar ${numOfCities} ciudades.`)
  }
}
