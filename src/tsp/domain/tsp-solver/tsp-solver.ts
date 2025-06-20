export interface TspCity {
  /** Nombre único de la ciudad */
  name: string
  /** Coordenadas x,y de la ciudad */
  coordinates: { x: number; y: number }
}

export interface TspDistance {
  /** Ciudad de origen */
  from: string
  /** Ciudad de destino */
  to: string
  /** Distancia entre las ciudades */
  distance: number
}

export interface TspSolution {
  /** Ruta óptima encontrada (incluye regreso al inicio) */
  route: string[]
  /** Distancia total del recorrido */
  totalDistance: number
}

/**
 * Solucionador del Problema del Viajante (TSP) que implementa el algoritmo
 * del vecino más cercano con mejoras 2-opt para encontrar rutas óptimas.
 *
 * El TSP es un problema de optimización combinatoria que busca la ruta
 * más corta que visite cada ciudad exactamente una vez y regrese al punto de origen.
 *
 * Algoritmos implementados:
 * - Vecino más cercano: O(n²) - Construcción inicial de la ruta
 * - 2-opt: Mejora iterativa intercambiando aristas
 *
 * @class TspSolver
 * @author Ian Ayala González
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * const cities = [
 *   { name: 'A', coordinates: { x: 0, y: 0 } },
 *   { name: 'B', coordinates: { x: 1, y: 1 } }
 * ];
 * const distances = [
 *   { from: 'A', to: 'B', distance: 1.41 },
 *   { from: 'B', to: 'A', distance: 1.41 }
 * ];
 * const solver = new TspSolver(cities, distances);
 * const solution = solver.solve();
 */
export class TspSolver {
  /**
   * Lista de ciudades del problema
   * @private
   * @type {TspCity[]}
   */
  private cities: TspCity[]

  /**
   * Matriz de distancias para acceso rápido O(1)
   * @private
   * @type {Map<string, number>}
   */
  private distanceMatrix: Map<string, number>

  /**
   * Constructor del solucionador TSP
   * @param {TspCity[]} cities - Array de ciudades con nombres y coordenadas
   * @param {TspDistance[]} distances - Array de distancias entre ciudades
   * @throws {Error} Si faltan distancias entre algún par de ciudades
   */
  constructor(cities: TspCity[], distances: TspDistance[]) {
    this.cities = cities
    this.distanceMatrix = new Map(
      distances.map(({ from, to, distance }) => [`${from}-${to}`, distance]),
    )
    this.validateInput()
  }

  /**
   * Resuelve el TSP utilizando el algoritmo del vecino más cercano con mejoras 2-opt
   *
   * Proceso de resolución:
   * 1. Construye una ruta inicial con el algoritmo del vecino más cercano
   * 2. Mejora la ruta usando el algoritmo 2-opt
   * 3. Agrega el regreso al punto de origen
   *
   * @returns {TspSolution} Solución con la ruta óptima y distancia total
   *
   * @example
   * const solution = solver.solve();
   * console.log(solution.route); // ['A', 'B', 'C', 'A']
   * console.log(solution.totalDistance); // 25.5
   */
  solve(): TspSolution {
    const [first] = this.cities
    if (!first) return { route: [], totalDistance: 0 }
    if (this.cities.length === 1)
      return { route: [first.name], totalDistance: 0 }

    const initialRoute = this.nearestNeighborAlgorithm()
    const initialDistance = this.calculateRouteDistance(initialRoute)

    const { route, totalDistance } = this.twoOptImprovement(
      initialRoute,
      initialDistance,
    )

    return {
      route: [...route, route[0]],
      totalDistance,
    }
  }

  /**
   * Algoritmo del Vecino más Cercano - Complejidad O(n²)
   *
   * Construye una ruta comenzando desde la primera ciudad y siempre
   * moviéndose a la ciudad no visitada más cercana.
   *
   * @private
   * @returns {string[]} Ruta construida con el algoritmo del vecino más cercano
   */
  private nearestNeighborAlgorithm(): string[] {
    const cityNames = this.cities.map((c) => c.name)
    const unvisited = new Set(cityNames.slice(1))
    const route = [cityNames[0]]

    while (unvisited.size > 0) {
      const current = route[route.length - 1]

      const [nearest] = [...unvisited].reduce<[string, number]>(
        ([nearestCity, nearestDist], candidate) => {
          const dist = this.getDistance(current, candidate)
          return dist < nearestDist
            ? [candidate, dist]
            : [nearestCity, nearestDist]
        },
        ['', Infinity],
      )

      route.push(nearest)
      unvisited.delete(nearest)
    }

    return route
  }

  /**
   * Algoritmo de mejora 2-opt
   *
   * Intenta mejorar la ruta intercambiando aristas. Para cada par de aristas
   * no adyacentes, verifica si intercambiarlas resulta en una ruta más corta.
   *
   * @private
   * @param {string[]} route - Ruta inicial a mejorar
   * @param {number} currentDistance - Distancia actual de la ruta
   * @returns {{route: string[], totalDistance: number}} Ruta mejorada con su distancia
   */
  private twoOptImprovement(
    route: string[],
    currentDistance: number,
  ): { route: string[]; totalDistance: number } {
    let bestRoute = [...route]
    let bestDistance = currentDistance
    let improved = true

    while (improved) {
      improved = false

      const candidates = bestRoute
        .flatMap((_, i) => bestRoute.map((_, j) => ({ i, j })))
        .filter(
          ({ i, j }) => i < j && j - i > 1 && i > 0 && j < bestRoute.length,
        )

      for (const { i, j } of candidates) {
        const newRoute = this.twoOptSwap(bestRoute, i, j)
        const newDistance = this.calculateRouteDistance(newRoute)

        if (newDistance < bestDistance) {
          bestRoute = newRoute
          bestDistance = newDistance
          improved = true
          break
        }
      }
    }

    return { route: bestRoute, totalDistance: bestDistance }
  }

  /**
   * Realiza la operación de intercambio 2-opt
   *
   * Invierte el segmento de la ruta entre los índices i y j para
   * crear una nueva configuración de ruta.
   *
   * @private
   * @param {string[]} route - Ruta original
   * @param {number} i - Índice de inicio del segmento a invertir
   * @param {number} j - Índice de fin del segmento a invertir
   * @returns {string[]} Nueva ruta con el segmento invertido
   */
  private twoOptSwap(route: string[], i: number, j: number): string[] {
    return [
      ...route.slice(0, i),
      ...route.slice(i, j + 1).reverse(),
      ...route.slice(j + 1),
    ]
  }

  /**
   * Calcula la distancia total de una ruta
   *
   * Suma las distancias entre ciudades consecutivas en la ruta
   * e incluye la distancia de regreso al punto de origen.
   *
   * @private
   * @param {string[]} route - Ruta para calcular la distancia
   * @returns {number} Distancia total de la ruta
   */
  private calculateRouteDistance(route: string[]): number {
    return route.length < 2
      ? 0
      : route
          .map((city, i) =>
            this.getDistance(city, route[(i + 1) % route.length]),
          )
          .reduce((acc, dist) => acc + dist, 0)
  }

  /**
   * Obtiene la distancia entre dos ciudades desde la matriz de distancias
   *
   * Busca la distancia en ambas direcciones (from-to y to-from) para
   * manejar matrices simétricas y asimétricas.
   *
   * @private
   * @param {string} from - Ciudad de origen
   * @param {string} to - Ciudad de destino
   * @returns {number} Distancia entre las ciudades o infinito si no existe
   */
  private getDistance(from: string, to: string): number {
    return (
      this.distanceMatrix.get(`${from}-${to}`) ??
      this.distanceMatrix.get(`${to}-${from}`) ??
      Infinity
    )
  }

  /**
   * Valida los datos de entrada
   *
   * Verifica que existan distancias para todos los pares de ciudades
   * necesarios para resolver el problema TSP.
   *
   * @private
   * @throws {Error} Si faltan distancias entre algún par de ciudades
   */
  private validateInput(): void {
    const cityNames = this.cities.map((c) => c.name)

    const missing = cityNames.some((city1) =>
      cityNames
        .filter((city2) => city2 !== city1)
        .some((city2) => this.getDistance(city1, city2) === Infinity),
    )

    if (missing) throw new Error('Faltan distancias entre algunas ciudades')
  }

  /**
   * Método estático para calcular la distancia euclidiana entre dos puntos
   *
   * Utiliza la fórmula: √[(x₂-x₁)² + (y₂-y₁)²]
   *
   * @static
   * @param {object} point1 - Primer punto con coordenadas x,y
   * @param {number} point1.x - Coordenada x del primer punto
   * @param {number} point1.y - Coordenada y del primer punto
   * @param {object} point2 - Segundo punto con coordenadas x,y
   * @param {number} point2.x - Coordenada x del segundo punto
   * @param {number} point2.y - Coordenada y del segundo punto
   * @returns {number} Distancia euclidiana entre los dos puntos
   *
   * @example
   * const distancia = TspSolver.calculateEuclideanDistance(
   *   { x: 0, y: 0 },
   *   { x: 3, y: 4 }
   * ); // Resultado: 5
   */
  static calculateEuclideanDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number },
  ): number {
    const dx = point1.x - point2.x
    const dy = point1.y - point2.y
    return Math.hypot(dx, dy)
  }
}
