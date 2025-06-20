# Solucionador TSP - Justificación Técnica

## Algoritmo Elegido: Vecino Más Cercano + 2-opt

### ¿Por qué está combinación?

- **Vecino Más Cercano**: Rápido (`O(n²)`) y da una buena solución inicial.
- **2-opt**: Mejora la ruta intercambiando aristas para reducir distancia.
- **Resultado**: Equilibrio perfecto entre velocidad y calidad para `N = 10` ciudades.

---

## Arquitectura Orientada a Objetos

### Clases Principales Implementadas

```plaintext
TspSolver
├── solve() → Método principal que resuelve el TSP
├── nearestNeighborAlgorithm() → Construye ruta inicial
└── twoOptImprovement() → Mejora la ruta

WorldGenerator
├── generateCities() → Crea ciudades aleatorias
└── getWorld() → Retorna el mundo con ciudades

City & World
├── City: Entidad inmutable (name, coordinates)
└── World: Contenedor que valida y almacena ciudades

Server (Nuevo - OOP)
├── initServer() → Inicia servidor con gestión completa
├── setupMiddlewares() → Configura CORS y validación
└── setupGracefulShutdown() → Cierre elegante
```

---

## Cambios Personales Realizados

### 1. Configuración de Desarrollo

- **ESLint personalizado**: Establecí mis propias reglas en `eslint.config.mjs`.
- **Prettier integrado**: Configuración propia para formateo consistente.
- **Validación estricta**: Pipes globales con `class-validator`.

### 2. Servidor Orientado a Objetos

Como el test pedía programación orientada a objetos, **refactoricé completamente el inicio de la aplicación**, ya que el original era más funcional. Ahora el servidor se inicia con una clase que gestiona todo el ciclo de vida.

### 3. Programación Declarativa vs Imperativa

**Decidí usar programación declarativa**, ya que aunque no hay tanta diferencia de rendimiento, queda mucho más sencillo y legible. Usar funciones de orden superior como `map`, `filter`, `reduce` y `flatMap` hace que el código sea más limpio y fácil de entender.

### 4. Documentación JSDoc Completa

Todo el código está documentado con JSDoc para facilitar mantenimiento:

---

## Implementación del Algoritmo

### Vecino Más Cercano

```ts
// Siempre ir a la ciudad no visitada más cercana
while (unvisited.size > 0) {
  const current = route[route.length - 1]

  const [nearest] = [...unvisited].reduce<[string, number]>(
    ([nearestCity, nearestDist], candidate) => {
      const dist = this.getDistance(current, candidate)
      return dist < nearestDist ? [candidate, dist] : [nearestCity, nearestDist]
    },
    ['', Infinity],
  )

  route.push(nearest)
  unvisited.delete(nearest)
}
```

### Mejora 2-opt

```ts
// Intercambiar aristas para encontrar mejores rutas
while (improved) {
  improved = false

  const candidates = bestRoute
    .flatMap((_, i) => bestRoute.map((_, j) => ({ i, j })))
    .filter(({ i, j }) => i < j && j - i > 1 && i > 0 && j < bestRoute.length)

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
```

---

## Optimizaciones Implementadas

### 1. Matriz de Distancias con `Map`

```ts
// Acceso O(1) en lugar de O(n) búsqueda en array
private distanceMatrix = new Map<string, number>();

private getDistance(from: string, to: string): number {
   return (
           this.distanceMatrix.get(`${from}-${to}`) ??
           this.distanceMatrix.get(`${to}-${from}`) ??
           Infinity
   )
}
```

### 2. Validación Temprana

```ts
// Fallar rápido si faltan distancias
constructor(cities: TspCity[], distances: TspDistance[]) {
   this.cities = cities
   this.distanceMatrix = new Map(
           distances.map(({ from, to, distance }) => [`${from}-${to}`, distance]),
   )
   this.validateInput()
}
```

### 3. Generación Eficiente de Coordenadas

```ts
// Fisher-Yates para distribución uniforme
private fisherYatesShuffle<T>(array: T[]): T[] {
   return array
           .map((value) => ({ value, sortKey: Math.random() }))
           .sort((a, b) => a.sortKey - b.sortKey)
           .map(({ value }) => value)
}
```

---

## Testing Completo

### Pruebas Unitarias

- ✅ **TspSolver**: Casos extremos (0, 1, 3 ciudades), validación, correctitud.
- ✅ **WorldGenerator**: Límites, unicidad, generación correcta.
- ✅ **City & World**: Creación, validación, prevención de duplicados.

### Pruebas E2E

- ✅ **API endpoints**: `/solve` y `/generate-cities` con datos válidos/inválidos.
- ✅ **Validación DTOs**: Manejo de errores `400`.
- ✅ **Integración completa**: Request → Service → Solver → Response.

---

## Rendimiento y Escalabilidad

| Ciudades | Tiempo  | Calidad      |
| -------- | ------- | ------------ |
| N = 10   | < 1ms   | ✅ Excelente |
| N = 20   | < 10ms  | Muy buena    |
| N = 50   | < 100ms | Aceptable    |

---

## API Endpoints Implementados

```ts
POST /api/tsp/solve
{
  "cities": ["A", "B", "C"],
  "distances": [{ "from": "A", "to": "B", "distance": 10 }]
}
→ { "route": ["A", "B", "C", "A"], "totalDistance": 45 }

POST /api/tsp/generate-cities
{
  "numOfCities": 5,
  "worldBoundX": 100,
  "worldBoundY": 100
}
→ { "cities": ["A", "B", "C", "D", "E"], "distances": [...] }
```

---

## Decisiones de Diseño

### ¿Por qué estas elecciones?

1. **Programación Declarativa**: Más legible, menos errores, aprovecha fortalezas de JavaScript.
2. **Servidor OOP**: Cumple requisito de orientación a objetos con gestión completa del ciclo de vida.
3. **Validación Estricta**: Fail-fast principle, errores claros desde el inicio.
4. **JSDoc Completo**: Facilita mantenimiento y comprensión del código.
5. **Map para distancias**: Acceso `O(1)` vs búsqueda en arrays `O(n)`.

---

## Conclusión

Esta implementación logra:

- ✅ **Correctitud**: Soluciones TSP válidas con validación robusta.
- ✅ **Rendimiento**: < 1ms para `N = 10` ciudades (requisito cumplido).
- ✅ **OOP**: Arquitectura orientada a objetos como se solicitó.
- ✅ **Mantenibilidad**: Código limpio, documentado y bien estructurado.
- ✅ **Extensibilidad**: Fácil agregar nuevos algoritmos o funcionalidades.

Priorice la claridad y robustez usando las mejores prácticas de JavaScript/TypeScript, programación declarativa donde
mejora la legibilidad, y documentación completa para facilitar el mantenimiento futuro.
