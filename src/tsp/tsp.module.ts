import { Module } from '@nestjs/common'
import { TspController } from './controllers/tsp.controller'
import { TspService } from './tsp.service'

/**
 * Módulo de NestJS que encapsula los componentes relacionados con
 * la resolución del Problema del Viajante (TSP).
 *
 * Este módulo organiza y agrupa el TspController y TspService,
 * proporcionando una estructura modular y mantenible para la
 * funcionalidad TSP de la aplicación.
 *
 * Los módulos de NestJS también son responsables de la resolución
 * de inyección de dependencias (DI) dentro de su alcance.
 *
 * @class TspModule
 * @author Ian Ayala González
 * @version 1.0.0
 * @since 1.0.0
 *
 * @example
 * // Uso en la aplicación principal
 * const app = await NestFactory.create(TspModule);
 */
@Module({
    imports: [],
    controllers: [TspController],
    providers: [TspService],
})
export class TspModule {}
