import { IsNumber } from 'class-validator'

/**
 * DTO que define la estructura de solicitud para el generador de ciudades.
 *
 * Esta clase encapsula los parámetros necesarios para generar un conjunto
 * aleatorio de ciudades con coordenadas únicas dentro de un mundo con
 * límites específicos.
 *
 * @class TspGenerateCitiesRequestDto
 * @author Ian Ayala Gonzalez
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * {
 *   "numOfCities": 10,
 *   "worldBoundX": 100,
 *   "worldBoundY": 100
 * }
 */
export class TspGenerateCitiesRequestDto {
  /**
   * Número de ciudades a generar
   *
   * Debe ser un número entero positivo. El número máximo de ciudades
   * está limitado por el área del mundo (worldBoundX * worldBoundY).
   *
   * @type {number}
   * @example 10
   */
  @IsNumber()
  numOfCities: number

  /**
   * Límite máximo del mundo en el eje X
   *
   * Define el rango de coordenadas X posibles: [0, worldBoundX].
   * Debe ser un número entero positivo.
   *
   * @type {number}
   * @example 100
   */
  @IsNumber()
  worldBoundX: number

  /**
   * Límite máximo del mundo en el eje Y
   *
   * Define el rango de coordenadas Y posibles: [0, worldBoundY].
   * Debe ser un número entero positivo.
   *
   * @type {number}
   * @example 100
   */
  @IsNumber()
  worldBoundY: number
}
