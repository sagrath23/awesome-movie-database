import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './infrastructure/controller';
import { OMDBMoviesRepository } from './infrastructure/adapter/omdb';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from './application';
import { MoviesCommand } from './infrastructure/command';
import { FindMoviesSubCommand } from './infrastructure/command/findMovie.subcommand';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [MoviesController],
  providers: [
    {
      provide: 'MoviesRepository',
      useClass: OMDBMoviesRepository,
    },
    GetMovieByIdUsecase,
    GetMovieByTitleUsecase,
    MoviesCommand,
    FindMoviesSubCommand,
  ],
})
export class MoviesModule {}
