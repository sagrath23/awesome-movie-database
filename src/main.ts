import { NestFactory } from '@nestjs/core';
import { VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { MoviesModule } from './modules/movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT') ?? '3000';

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port, () => {
    Logger.log(`Server running at port ${port}`);
  });
}

async function bootstrapCLI() {
  const enableDebug = process.env.ENABLE_DEBUG == 'true';

  if (enableDebug) {
    await CommandFactory.run(MoviesModule, ['log', 'warn', 'error']);
  } else {
    await CommandFactory.run(MoviesModule, []);
  }
}
// by default app will be running as CLI
const execMode = process.env.EXEC_MODE ?? 'cli';
const runAsCLI = execMode === 'cli';

runAsCLI ? bootstrapCLI() : bootstrap();
