import type { City, Coordinates } from './city'

/**
 * Interfaz que define los límites del mundo
 * @interface Bounds
 */
export interface Bounds {
  /** Límite máximo en el eje X */
  x: number
  /** Límite máximo en el eje Y */
  y: number
}

/**
 * Clase que representa un mundo que contiene ciudades con coordenadas únicas.
 *
 * El mundo actúa como un contenedor que gestiona un conjunto de ciudades,
 * asegurando que no haya duplicados en nombres o coordenadas, y que todas
 * las ciudades estén dentro de los límites establecidos.
 *
 * Restricciones:
 * - No se permiten ciudades con el mismo nombre
 * - No se permiten ciudades con las mismas coordenadas X o Y
 * - Todas las ciudades deben estar dentro de los límites del mundo
 * - Los límites del mundo deben ser positivos
 *
 * @class World
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * const world = new World({ x: 100, y: 100 });
 * const city = new City('A', { x: 50, y: 50 });
 * const added = world.addCity(city); // true si se agregó exitosamente
 */
export class World {
  /**
   * Conjunto privado de ciudades en el mundo
   */
  private readonly citiesSet: City[] = []

  /**
   * Límites del mundo (solo lectura)
   */
  readonly bounds: Bounds

  /**
   * Constructor del mundo
   *
   * @param {Bounds} bounds - Límites del mundo con coordenadas máximas
   * @throws {NegativeBoundsError} Si los límites son negativos
   *
   * @example
   * const world = new World({ x: 50, y: 50 });
   */
  constructor(bounds: Bounds) {
    const areBoundsNegative = bounds.x < 0 || bounds.y < 0

    if (areBoundsNegative) {
      throw new NegativeBoundsError(bounds)
    }

    this.bounds = bounds
  }

  /**
   * Getter que devuelve una copia del array de ciudades
   *
   * Devuelve una copia para prevenir modificaciones externas
   * del estado interno del mundo.
   *
   * @returns {City[]} Copia del array de ciudades
   *
   * @example
   * const cities = world.cities;
   * console.log(cities.length); // Número de ciudades
   */
  get cities(): City[] {
    return [...this.citiesSet]
  }

  /**
   * Intenta agregar una ciudad al conjunto de ciudades del mundo.
   *
   * Validaciones realizadas:
   * 1. La ciudad debe estar dentro de los límites del mundo
   * 2. No debe existir otra ciudad con el mismo nombre
   * 3. No debe existir otra ciudad con las mismas coordenadas X o Y
   *
   * Una ciudad se considera duplicada si comparte el mismo nombre o
   * tiene la misma coordenada x o y que una ciudad existente.
   *
   * @param {City} city - Ciudad a agregar al mundo
   * @returns {boolean} true si la ciudad se agregó exitosamente, false si es duplicada
   * @throws {OutOfBoundsError} Si la ciudad está fuera de los límites del mundo
   *
   * @example
   * const city1 = new City('A', { x: 10, y: 20 });
   * const city2 = new City('B', { x: 10, y: 30 }); // Misma X, será rechazada
   *
   * world.addCity(city1); // true
   * world.addCity(city2); // false (misma coordenada X)
   */
  addCity(city: City): boolean {
    const isOutOfBounds =
      city.coordinates.x < 0 ||
      city.coordinates.y < 0 ||
      city.coordinates.x > this.bounds.x ||
      city.coordinates.y > this.bounds.y

    if (isOutOfBounds) {
      throw new OutOfBoundsError(city.name, city.coordinates, this.bounds)
    }

    const isInSet = this.citiesSet.some(
      (cityInSet) =>
        cityInSet.name === city.name ||
        cityInSet.coordinates.x === city.coordinates.x ||
        cityInSet.coordinates.y === city.coordinates.y,
    )

    return !isInSet && !!this.citiesSet.push(city)
  }
}

/**
 * Error personalizado que se lanza cuando se intenta agregar una ciudad
 * fuera de los límites del mundo.
 *
 * @class OutOfBoundsError
 * @extends {Error}
 */
class OutOfBoundsError extends Error {
  /**
   * Constructor del error
   * @param {string} cityName - Nombre de la ciudad que causó el error
   * @param {Coordinates} coordinates - Coordenadas de la ciudad
   * @param {Bounds} bounds - Límites del mundo
   */
  constructor(cityName: string, coordinates: Coordinates, bounds: Bounds) {
    super(
      `Se intentó agregar la ciudad ${cityName} en las coordenadas ` +
        `(${coordinates.x}, ${coordinates.y}) que están fuera de los ` +
        `límites del mundo. Los límites son X: 1 a ${bounds.x}, Y: 1 a ${bounds.y}.`,
    )
  }
}

/**
 * Error personalizado que se lanza cuando se intenta crear un mundo
 * con límites negativos.
 *
 * @class NegativeBoundsError
 * @extends {Error}
 */
class NegativeBoundsError extends Error {
  /**
   * Constructor del error
   * @param {Bounds} bounds - Límites negativos que causaron el error
   */
  constructor(bounds: Bounds) {
    super(
      `Se esperaban límites positivos para instanciar el Mundo, pero se recibió X: ` +
        `${bounds.x}, Y: ${bounds.y}`,
    )
  }
}
