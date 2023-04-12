import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './infrastructure/controller';
import { OMDBMoviesRepository } from './infrastructure/adapter/omdb';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from './application';
import { MoviesCommand } from './infrastructure/command';
import { KeyringService } from './infrastructure/keyring';
import { SetupQuestions } from './infrastructure/command/setup.taskQuestions';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MoviesController],
  providers: [
    KeyringService,
    {
      provide: 'MoviesRepository',
      useClass: OMDBMoviesRepository,
    },
    GetMovieByIdUsecase,
    GetMovieByTitleUsecase,
    SetupQuestions,
    ...MoviesCommand.registerWithSubCommands(),
  ],
})
export class MoviesModule {}
