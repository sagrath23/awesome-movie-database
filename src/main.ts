import { NestFactory } from '@nestjs/core';
import { VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { MoviesModule } from './modules/movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const shouldRunAsCLI = config.get<string>('EXEC_MODE') === 'cli';

  // TODO: look how to get env var set in CLI here
  if (shouldRunAsCLI) {
    Logger.log('Running in CLI mode...');
    // TODO: enable debug mode w/ env vars
    await CommandFactory.run(MoviesModule, ['log', 'warn', 'error']);

    return 0;
  }

  const port = config.get<number>('PORT') ?? '3000';

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port, () => {
    Logger.log(`Server running at port ${port}`);
  });
}

bootstrap();
