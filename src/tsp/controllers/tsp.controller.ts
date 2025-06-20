import { Body, Controller, Post } from '@nestjs/common'
import { TspService } from '../tsp.service'
import { TspSolveResponseDto } from '../dtos/response/solve.response.dto'
import { TspSolveRequestDto } from '../dtos/request/solve.request.dto'
import { TspGenerateCitiesResponseDto } from '../dtos/response/generate-cities.response.dto'
import { TspGenerateCitiesRequestDto } from '../dtos/request/generate-cities.request.dto'

/**
 * Controlador de NestJS para manejar las solicitudes relacionadas con
 * el Problema del Viajante (TSP).
 */
@Controller('tsp')
export class TspController {
  constructor(private readonly tspService: TspService) {}

  /**
   * Endpoint para resolver un problema del Viajante (TSP)
   *
   * Recibe una lista de ciudades y sus distancias, y devuelve la ruta óptima
   * encontrada junto con la distancia total del recorrido.
   *
   * @param {TspSolveRequestDto} payload - Datos de entrada con ciudades y distancias
   * @returns {TspSolveResponseDto} Respuesta con la ruta óptima y distancia total
   *
   * @example
   * POST /tsp/solve
   * {
   *   "cities": ["A", "B", "C"],
   *   "distances": [
   *     { "from": "A", "to": "B", "distance": 10 },
   *     { "from": "B", "to": "A", "distance": 10 },
   *     { "from": "A", "to": "C", "distance": 15 },
   *     { "from": "C", "to": "A", "distance": 15 },
   *     { "from": "B", "to": "C", "distance": 20 },
   *     { "from": "C", "to": "B", "distance": 20 }
   *   ]
   * }
   */
  @Post('solve')
  solve(@Body() payload: TspSolveRequestDto): TspSolveResponseDto {
    return this.tspService.solve(payload)
  }

  /**
   * Endpoint para generar un conjunto aleatorio de ciudades con sus distancias
   *
   * Genera ciudades con coordenadas aleatorias dentro de los límites especificados
   * y calcula las distancias euclidianas entre todas las parejas de ciudades.
   *
   * @param {TspGenerateCitiesRequestDto} payload - Parámetros para la generación de ciudades
   * @returns {TspGenerateCitiesResponseDto} Respuesta con las ciudades generadas y sus distancias
   *
   * @example
   * POST /tsp/generate-cities
   * {
   *   "numOfCities": 5,
   *   "worldBoundX": 100,
   *   "worldBoundY": 100
   * }
   */

  @Post('generate-cities')
  generateCities(
    @Body() payload: TspGenerateCitiesRequestDto,
  ): TspGenerateCitiesResponseDto {
    return this.tspService.generateCities(payload)
  }
}
