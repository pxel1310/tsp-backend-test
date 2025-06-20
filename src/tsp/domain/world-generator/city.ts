/**
 * Interfaz que define las coordenadas de una ciudad en un plano 2D
 * @interface Coordinates
 */
export interface Coordinates {
  /** Coordenada en el eje X */
  x: number
  /** Coordenada en el eje Y */
  y: number
}

/**
 * Clase que representa una ciudad con nombre y coordenadas.
 *
 * Una ciudad es una entidad básica en el problema TSP que tiene
 * un identificador único (nombre) y una posición en el espacio 2D.
 *
 * Esta clase es inmutable - una vez creada, sus propiedades no pueden
 * ser modificadas, lo que garantiza la integridad de los datos.
 *
 * @class City
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * const city = new City('Madrid', { x: 40.4168, y: -3.7038 });
 * console.log(city.name); // 'Madrid'
 * console.log(city.coordinates); // { x: 40.4168, y: -3.7038 }
 */
export class City {
  /**
   * Constructor de la ciudad
   *
   * @param {string} name - Nombre único de la ciudad
   * @param {Coordinates} coordinates - Coordenadas de la ciudad en el plano 2D
   *
   * @example
   * const barcelona = new City('Barcelona', { x: 41.3851, y: 2.1734 });
   * const valencia = new City('Valencia', { x: 39.4699, y: -0.3763 });
   */
  constructor(
    /** Nombre único e inmutable de la ciudad */
    readonly name: string,
    /** Coordenadas inmutables de la ciudad */
    readonly coordinates: Coordinates,
  ) {}
}
