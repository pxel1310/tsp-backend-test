import { Test, type TestingModule } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { TspModule } from '../src/tsp/tsp.module'

describe('TspController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TspModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('/api/tsp/generate-cities (POST)', () => {
    it('should generate cities successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/tsp/generate-cities')
        .send({
          numOfCities: 3,
          worldBoundX: 10,
          worldBoundY: 10,
        })
        .expect(201)

      expect(response.body).toHaveProperty('cities')
      expect(response.body).toHaveProperty('distances')
      expect(response.body.cities).toHaveLength(3)
      expect(Array.isArray(response.body.distances)).toBe(true)
    })

    it('should return 400 for invalid input', async () => {
      await request(app.getHttpServer())
        .post('/api/tsp/generate-cities')
        .send({
          numOfCities: 'invalid',
          worldBoundX: 10,
          worldBoundY: 10,
        })
        .expect(400)
    })
  })

  describe('/api/tsp/solve (POST)', () => {
    it('should solve TSP successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/tsp/solve')
        .send({
          cities: ['A', 'B', 'C'],
          distances: [
            { from: 'A', to: 'B', distance: 10 },
            { from: 'B', to: 'A', distance: 10 },
            { from: 'A', to: 'C', distance: 15 },
            { from: 'C', to: 'A', distance: 15 },
            { from: 'B', to: 'C', distance: 20 },
            { from: 'C', to: 'B', distance: 20 },
          ],
        })
        .expect(201)

      expect(response.body).toHaveProperty('route')
      expect(response.body).toHaveProperty('totalDistance')
      expect(Array.isArray(response.body.route)).toBe(true)
      expect(typeof response.body.totalDistance).toBe('number')
    })

    it('should return 400 for missing distances', async () => {
      await request(app.getHttpServer())
        .post('/api/tsp/solve')
        .send({
          cities: ['A', 'B'],
          distances: [],
        })
        .expect(400)
    })

    it('should return 400 for invalid cities array', async () => {
      await request(app.getHttpServer())
        .post('/api/tsp/solve')
        .send({
          cities: ['A'], // Less than 2 cities
          distances: [],
        })
        .expect(400)
    })
  })
})
