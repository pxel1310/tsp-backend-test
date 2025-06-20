/**
 * DTO que define la respuesta devuelta al resolver el problema TSP.
 *
 * Esta interfaz encapsula la solución encontrada por el algoritmo TSP,
 * incluyendo la ruta óptima y la distancia total del recorrido.
 *
 * @interface TspSolveResponseDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "route": ["A", "B", "C", "D", "A"],
 *   "totalDistance": 245.7
 * }
 */
export interface TspSolveResponseDto {
  /**
   * Ruta óptima encontrada por el algoritmo
   *
   * Array ordenado de nombres de ciudades que representa la secuencia
   * de visita óptima. La ruta incluye el regreso al punto de origen,
   * por lo que el primer y último elemento son iguales.
   *
   * @type {string[]}
   * @example ["Madrid", "Barcelona", "Valencia", "Sevilla", "Madrid"]
   */
  route: string[]

  /**
   * Distancia total del recorrido óptimo
   *
   * Suma de todas las distancias entre ciudades consecutivas en la ruta,
   * incluyendo la distancia de regreso al punto de origen.
   * El valor está redondeado a 2 decimales para mayor legibilidad.
   *
   * @type {number}
   * @example 1247.85
   */
  totalDistance: number
}
