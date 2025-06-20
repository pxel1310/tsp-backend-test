import { IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator"

/**
 * DTO que representa la distancia entre dos ciudades en el problema TSP.
 *
 * Esta clase define la estructura de datos para especificar la distancia
 * direccional entre un par de ciudades, permitiendo matrices de distancia
 * asimétricas si es necesario.
 *
 * @class TspDistanceRequestDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "from": "Madrid",
 *   "to": "Barcelona",
 *   "distance": 621.5
 * }
 */
export class TspDistanceRequestDto {
  /**
   * Ciudad de origen
   * Debe ser una cadena no vacía que identifique únicamente la ciudad
   *
   * @type {string}
   * @example "Madrid"
   */
  @IsString()
  @IsNotEmpty()
  from: string

  /**
   * Ciudad de destino
   * Debe ser una cadena no vacía que identifique únicamente la ciudad
   *
   * @type {string}
   * @example "Barcelona"
   */
  @IsString()
  @IsNotEmpty()
  to: string

  /**
   * Distancia entre las ciudades
   * Debe ser un número positivo que represente la distancia
   * (puede ser en kilómetros, millas, tiempo, etc.)
   *
   * @type {number}
   * @example 621.5
   */
  @IsNumber()
  distance: number
}

/**
 * DTO que define la estructura de solicitud para resolver el problema TSP.
 *
 * Esta clase encapsula todos los datos necesarios para resolver un problema
 * del Viajante: la lista de ciudades a visitar y las distancias entre
 * cada par de ciudades.
 *
 * @class TspSolveRequestDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "cities": ["A", "B", "C", "D"],
 *   "distances": [
 *     {"from": "A", "to": "B", "distance": 10},
 *     {"from": "B", "to": "A", "distance": 10},
 *     {"from": "A", "to": "C", "distance": 15},
 *     // ... más distancias
 *   ]
 * }
 */
export class TspSolveRequestDto {
  /**
   * Lista de nombres de ciudades a visitar
   *
   * Debe contener al menos 2 ciudades para que el problema TSP tenga sentido.
   * Cada elemento debe ser una cadena de al menos 1 caracter.
   *
   * @type {string[]}
   * @example ["Madrid", "Barcelona", "Valencia", "Sevilla"]
   */
  @MinLength(1, { each: true })
  cities: string[]

  /**
   * Array de distancias entre ciudades
   *
   * Debe incluir las distancias necesarias entre las ciudades especificadas.
   * Para un problema TSP completo, se necesitan distancias bidireccionales
   * entre todos los pares de ciudades.
   *
   * @type {TspDistanceRequestDto[]}
   * @example
   * [
   *   {"from": "Madrid", "to": "Barcelona", "distance": 621},
   *   {"from": "Barcelona", "to": "Madrid", "distance": 621},
   *   {"from": "Madrid", "to": "Valencia", "distance": 357}
   * ]
   */
  @ValidateNested()
  distances: TspDistanceRequestDto[]
}
