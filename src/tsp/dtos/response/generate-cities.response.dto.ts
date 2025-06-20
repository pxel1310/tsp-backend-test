/**
 * DTO que representa la distancia entre dos ciudades en el problema TSP.
 *
 * Esta interfaz define la estructura de datos para las distancias
 * calculadas entre pares de ciudades generadas aleatoriamente.
 *
 * @interface TspDistanceResponseDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "from": "A",
 *   "to": "B",
 *   "distance": 14.32
 * }
 */
export interface TspDistanceResponseDto {
  /**
   * Ciudad de origen
   * Nombre de la ciudad desde donde se mide la distancia
   *
   * @type {string}
   * @example "A"
   */
  from: string

  /**
   * Ciudad de destino
   * Nombre de la ciudad hasta donde se mide la distancia
   *
   * @type {string}
   * @example "B"
   */
  to: string

  /**
   * Distancia euclidiana entre las ciudades
   * Distancia calculada usando la fórmula euclidiana entre
   * las coordenadas de las dos ciudades, redondeada a 2 decimales
   *
   * @type {number}
   *  @example 14.32
   */
  distance: number
}

/**
 * DTO que define la respuesta para la generación de un conjunto aleatorio
 * de ciudades junto con sus distancias.
 *
 * Esta interfaz encapsula el resultado de generar ciudades aleatorias,
 * incluyendo los nombres de las ciudades y todas las distancias
 * bidireccionales entre ellas.
 *
 * @interface TspGenerateCitiesResponseDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "cities": ["A", "B", "C"],
 *   "distances": [
 *     {"from": "A", "to": "B", "distance": 14.32},
 *     {"from": "B", "to": "A", "distance": 14.32},
 *     {"from": "A", "to": "C", "distance": 22.67},
 *     {"from": "C", "to": "A", "distance": 22.67},
 *     {"from": "B", "to": "C", "distance": 18.03},
 *     {"from": "C", "to": "B", "distance": 18.03}
 *   ]
 * }
 */
export interface TspGenerateCitiesResponseDto {
  /**
   * Lista de nombres de ciudades generadas
   *
   * Array de nombres únicos asignados a las ciudades generadas.
   * Los nombres siguen un patrón alfabético: A, B, C, ..., Z, AA, AB, etc.
   *
   * @type {string[]}
   * @example ["A", "B", "C", "D", "E"]
   */
  cities: string[]

  /**
   * Array de distancias entre todas las parejas de ciudades
   *
   * Contiene las distancias euclidianas bidireccionales entre
   * todos los pares de ciudades generadas. Para n ciudades,
   * habrá n*(n-1) distancias (n-1 distancias por cada ciudad).
   *
   * @type {TspDistanceResponseDto[]}
   * @example
   * [
   *   {"from": "A", "to": "B", "distance": 14.32},
   *   {"from": "B", "to": "A", "distance": 14.32},
   *   {"from": "A", "to": "C", "distance": 22.67}
   * ]
   */
  distances: TspDistanceResponseDto[]
}
