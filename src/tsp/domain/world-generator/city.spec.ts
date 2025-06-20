import { City, Coordinates } from './city'

describe('City', () => {
  const cityName = 'TestCity'
  const cityCoordinates: Coordinates = { x: 10, y: 20 }

  it('should create a city instance with a name and coordinates', () => {
    const city = new City(cityName, cityCoordinates)

    expect(city.name).toBe(cityName)
    expect(city.coordinates).toEqual(cityCoordinates)
  })
})
