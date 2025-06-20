import { Test, TestingModule } from '@nestjs/testing'
import { TspController } from './tsp.controller'
import { TspService } from '../tsp.service'

describe('TspController', () => {
  let tspController: TspController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TspController],
      providers: [TspService],
    }).compile()

    tspController = app.get<TspController>(TspController)
  })

  describe('tspController', () => {
    it('runs solver for 10 cities', () => {
      expect(
        tspController.solve(
          tspController.generateCities({
            numOfCities: 10,
            worldBoundX: 300,
            worldBoundY: 300,
          }),
        ),
      ).toBeDefined()
    })
  })
})
