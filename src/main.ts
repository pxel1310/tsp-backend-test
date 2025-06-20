import { NestFactory } from '@nestjs/core'
import { TspModule } from './tsp/tsp.module'
import { Logger, ValidationPipe, type INestApplication } from '@nestjs/common'

process.loadEnvFile()

/**
 * Clase servidor que inicializa y ejecuta el servidor de la API del Solucionador TSP.
 * @class Server
 * @author Ian Ayala González
 * @version 1.0.0
 * @since 1.0.0
 */
class Server {
  private app!: INestApplication
  private readonly port = process.env.PORT ?? '3000'
  private readonly apiPrefix = '/api'

  private readonly apiPaths = {
    tsp: {
      solve: `${this.apiPrefix}/tsp/solve`,
      generateCities: `${this.apiPrefix}/tsp/generate-cities`,
    },
  }

  /**
   * Inicia el servidor y configura la aplicación
   * @public
   * @async
   * @returns {Promise<void>}
   */
  public async initServer(): Promise<void> {
    Logger.log('🚀 Iniciando Servidor Solucionador TSP...')
    this.logStartupInfo()

    await this.createApp()
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupGracefulShutdown()
    await this.startServer()

    Logger.log('✅ ¡Servidor Solucionador TSP iniciado exitosamente!')
  }

  /**
   * Crea la instancia de la aplicación NestJS
   * @private
   */
  private async createApp(): Promise<void> {
    try {
      this.app = await NestFactory.create(TspModule)
      Logger.log('✅ Aplicación NestJS creada exitosamente')
    } catch (error) {
      Logger.error('❌ Falló la creación de la aplicación NestJS', error)
      throw error
    }
  }

  /**
   * Configura middlewares globales y CORS
   * @private
   */
  private setupMiddlewares(): void {
    this.app.setGlobalPrefix(this.apiPrefix)
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    this.app.enableCors({
      origin: this.getAllowedOrigins(),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
    Logger.log('✅ Middlewares configurados exitosamente')
  }

  /**
   * Configura las rutas de salud y muestra endpoints disponibles
   * @private
   */
  private setupRoutes(): void {
    this.app.getHttpAdapter().get(this.apiPrefix, (_, res) => {
      return res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'API Solucionador TSP',
        version: '1.0.0',
        endpoints: this.apiPaths.tsp,
        author: 'Ian Ayala González',
      })
    })

    Logger.log('✅ Rutas configuradas exitosamente')
    Logger.log('📍 Endpoints disponibles:')
    Logger.log(`   POST ${this.apiPaths.tsp.solve}`)
    Logger.log(`   POST ${this.apiPaths.tsp.generateCities}`)
  }

  /**
   * Inicia el servidor y escucha en el puerto especificado
   * @private
   */
  private async startServer(): Promise<void> {
    try {
      await this.app.listen(this.port)
      Logger.log(
        `🚀 Servidor ejecutándose en http://localhost:${this.port}${this.apiPrefix}`,
      )
    } catch (error) {
      Logger.error('❌ Falló el inicio del servidor', error)
      throw error
    }
  }

  /**
   * Configura el cierre elegante ante señales del sistema
   * @private
   */
  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      Logger.log(`📡 Señal ${signal} recibida. Cerrando...`)
      try {
        await this.app.close()
        Logger.log('✅ Aplicación cerrada exitosamente')
        process.exit(0)
      } catch (error) {
        Logger.error('❌ Error durante el cierre', error)
        process.exit(1)
      }
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))
  }

  /**
   * Obtiene los orígenes permitidos para CORS
   * @private
   * @returns {string[]}
   */
  private getAllowedOrigins(): string[] {
    return process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000']
  }

  /**
   * Muestra información de configuración inicial
   * @private
   */
  private logStartupInfo(): void {
    Logger.log('🔧 Configuración del Servidor:')
    Logger.log(`   Puerto: ${this.port}`)
    Logger.log(`   Prefijo API: ${this.apiPrefix}`)
    Logger.log(`   Entorno: ${process.env.NODE_ENV ?? 'development'}`)
    Logger.log(`   Orígenes CORS: ${this.getAllowedOrigins().join(', ')}`)
  }
}

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Rechazo no manejado en:', promise, 'razón:', reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  Logger.error('Excepción no capturada:', error)
  process.exit(1)
})

void new Server().initServer()
