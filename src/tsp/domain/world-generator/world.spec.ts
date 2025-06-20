import { World } from './world'
import { City } from './city'

describe('World', () => {
  const bounds = { x: 10, y: 10 }

  let world: World

  beforeEach(() => {
    world = new World(bounds)
  })

  it('should initialize with no cities', () => {
    expect(world.cities).toEqual([])
  })

  it('should add a city successfully', () => {
    const city = new City('A', { x: 1, y: 1 })
    const result = world.addCity(city)
    expect(result).toBe(true)
    expect(world.cities.length).toBe(1)
    expect(world.cities[0]).toBe(city)
  })

  it('should not add a city with a duplicate name', () => {
    const city1 = new City('A', { x: 1, y: 1 })
    const city2 = new City('A', { x: 2, y: 2 })

    world.addCity(city1)
    const result = world.addCity(city2)

    expect(result).toBe(false)
    expect(world.cities.length).toBe(1)
  })

  it('should not add a city with the same coordinates', () => {
    const city1 = new City('A', { x: 1, y: 1 })
    const city2 = new City('B', { x: 1, y: 1 })

    world.addCity(city1)
    const result = world.addCity(city2)

    expect(result).toBe(false)
    expect(world.cities.length).toBe(1)
  })

  it('should allow adding a city with different coordinates and name', () => {
    const city1 = new City('A', { x: 1, y: 1 })
    const city2 = new City('B', { x: 2, y: 2 })

    world.addCity(city1)
    const result = world.addCity(city2)

    expect(result).toBe(true)
    expect(world.cities.length).toBe(2)
  })

  it('should not add a city if the number exceeds the world bounds', () => {
    const city1 = new City('A', { x: 11, y: 11 })
    expect(() => world.addCity(city1)).toThrowError(
      'Attempted to add city A at coordinates (11, 11) which are out of world bounds. Bounds are X: 1 to 10, Y: 1 to 10.',
    )
  })
})
