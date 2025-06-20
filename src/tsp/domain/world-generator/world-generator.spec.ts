import { WorldGenerator } from './world-generator'
import { World, type Bounds } from './world'
import type { City } from './city'

const bounds: Bounds = { x: 10, y: 10 }

jest.mock('./city')
jest.mock('./world', () => {
  return {
    World: jest.fn().mockImplementation(function (bounds: Bounds) {
      this.bounds = bounds
      this.cities = []
      this.addCity = (city: City) => Boolean(this.cities.push(city))
    }),
  }
})

describe('WorldGenerator', () => {
  describe('constructor', () => {
    it('should initialize correctly with valid parameters', () => {
      expect(() => new WorldGenerator(5, bounds)).not.toThrow()
    })

    it('should throw an error if the number of cities exceeds the bounds', () => {
      expect(() => new WorldGenerator(200, bounds)).toThrowError(
        "World's bounds aren't big enough to fit 200 cities.",
      )
    })
  })

  describe('generateCities', () => {
    const NUM_OF_CITIES = 5
    let worldGenerator: WorldGenerator
    let world: World

    beforeEach(() => {
      ;(World as jest.Mock).mockClear()
      worldGenerator = new WorldGenerator(NUM_OF_CITIES, bounds)
      worldGenerator.generateCities()
      world = worldGenerator.getWorld()
    })

    it('should reset the world instance', () => {
      expect(World).toHaveBeenCalledTimes(2) // called initially and after reset
    })

    it('should generate the correct number of cities', () => {
      expect(world.cities.length).toBe(NUM_OF_CITIES)
    })
  })

  describe('helper functions', () => {
    const NUM_OF_CITIES = 5
    let worldGenerator: WorldGenerator

    beforeEach(() => {
      worldGenerator = new WorldGenerator(NUM_OF_CITIES, bounds)
    })

    it('should generate unique alphabet labels', () => {
      const alphabet = worldGenerator['generateAlphabet']()
      expect(alphabet.length).toBe(NUM_OF_CITIES)
      expect(new Set(alphabet).size).toBe(NUM_OF_CITIES)
    })

    it('should generate unique coordinates', () => {
      const coordinates = worldGenerator['generateCoordinates']()
      expect(coordinates.length).toBe(NUM_OF_CITIES)
      expect(new Set(coordinates.map(({ x, y }) => `${x},${y}`)).size).toBe(
        NUM_OF_CITIES,
      )
    })
  })

  describe('getWorld', () => {
    let worldGenerator: WorldGenerator

    beforeEach(() => {
      worldGenerator = new WorldGenerator(5, bounds)
    })

    it('should return the World instance', () => {
      const world = worldGenerator.getWorld()
      expect(world).toBeInstanceOf(World)
      expect(world).toEqual(worldGenerator['world'])
    })
  })
})
