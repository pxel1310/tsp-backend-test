import { Injectable } from '@nestjs/common'
import type { TspSolveResponseDto } from './dtos/response/solve.response.dto'
import type { TspSolveRequestDto } from './dtos/request/solve.request.dto'
import type { TspGenerateCitiesResponseDto } from './dtos/response/generate-cities.response.dto'
import { WorldGenerator } from './domain/world-generator/world-generator'
import type { TspGenerateCitiesRequestDto } from './dtos/request/generate-cities.request.dto'
import {
  TspSolver,
  type TspCity,
  type TspDistance,
} from './domain/tsp-solver/tsp-solver'

/**
 * Servicio de NestJS responsable de implementar la lógica central
 * para resolver el Problema del Viajante (TSP) y generar coordenadas
 * aleatorias de ciudades.
 *
 * Este servicio actúa como una capa de abstracción entre los controladores
 * y la lógica de dominio, coordinando las operaciones de resolución TSP
 * y generación de ciudades.
 *
 * @class TspService
 * @author Ian Ayala González
 * @version 1.0.0
 * @since 1.0.0
 */
@Injectable()
export class TspService {
  /**
   * Resuelve un problema del Viajante (TSP) utilizando el algoritmo
   * del vecino más cercano con mejoras 2-opt.
   *
   * Convierte el formato de solicitud al formato esperado por TspSolver,
   * ejecuta el algoritmo de resolución y devuelve la solución optimizada.
   *
   * @param {TspSolveRequestDto} payload - Datos de entrada con ciudades y distancias
   * @returns {TspSolveResponseDto} Solución con la ruta óptima y distancia total
   *
   * @example
   * const resultado = tspService.solve({
   *   cities: ["A", "B", "C"],
   *   distances: [
   *     {from: "A", to: "B", distance: 10},
   *     {from: "B", to: "C", distance: 15},
   *     {from: "C", to: "A", distance: 20}
   *   ]
   * });
   * // resultado: { route: ["A", "B", "C", "A"], totalDistance: 45 }
   */
  solve(payload: TspSolveRequestDto): TspSolveResponseDto {
    const cities: TspCity[] = payload.cities.map((cityName) => ({
      name: cityName,
      coordinates: { x: 0, y: 0 },
    }))

    const distances: TspDistance[] = payload.distances.map((d) => ({
      from: d.from,
      to: d.to,
      distance: d.distance,
    }))

    const solver = new TspSolver(cities, distances)
    const solution = solver.solve()

    return {
      route: solution.route,
      totalDistance: Math.round(solution.totalDistance * 100),
    }
  }

  /**
   * Genera un conjunto aleatorio de ciudades con coordenadas únicas
   * y calcula las distancias euclidianas entre todas las parejas.
   *
   * Utiliza el WorldGenerator para crear ciudades con nombres alfabéticos
   * únicos y coordenadas aleatorias dentro de los límites especificados.
   * Luego calcula las distancias bidireccionales entre todas las ciudades.
   *
   * @param {TspGenerateCitiesRequestDto} payload - Parámetros de generación
   * @returns {TspGenerateCitiesResponseDto} Ciudades generadas con sus distancias
   *
   * @example
   * const resultado = tspService.generateCities({
   *   numOfCities: 3,
   *   worldBoundX: 10,
   *   worldBoundY: 10
   * });
   * // resultado: {
   * //   cities: ["A", "B", "C"],
   * //   distances: [
   * //     {from: "A", to: "B", distance: 5.66},
   * //     {from: "B", to: "A", distance: 5.66},
   * //     ...
   * //   ]
   * // }
   */
  generateCities(
    payload: TspGenerateCitiesRequestDto,
  ): TspGenerateCitiesResponseDto {
    const worldGenerator = new WorldGenerator(payload.numOfCities, {
      x: payload.worldBoundX,
      y: payload.worldBoundY,
    })

    worldGenerator.generateCities()
    const cities = worldGenerator.getWorld().cities
    const cityNames = cities.map((city) => city.name)

    const distances = cities.flatMap((city1, i) =>
      cities.slice(i + 1).flatMap((city2) => {
        const distance = TspSolver.calculateEuclideanDistance(
          city1.coordinates,
          city2.coordinates,
        )
        const rounded = Math.round(distance * 100) / 100
        return [
          { from: city1.name, to: city2.name, distance: rounded },
          { from: city2.name, to: city1.name, distance: rounded },
        ]
      }),
    )

    return {
      cities: cityNames,
      distances,
    }
  }
}
