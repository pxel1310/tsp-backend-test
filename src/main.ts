import { NestFactory } from '@nestjs/core';
import { TspModule } from './tsp/tsp.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const port = process.env.PORT ?? 3000;
    const prefix = 'api';
    const app = await NestFactory.create(TspModule);
    await app.listen(port);
    app.setGlobalPrefix(prefix);
    app.useGlobalPipes(new ValidationPipe());
    Logger.log(`Application is running on: http://localhost:${port}/${prefix}`);
}

void bootstrap();
