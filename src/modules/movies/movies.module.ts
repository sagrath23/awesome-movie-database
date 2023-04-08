import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './infrastructure/controller';
import { OMDBMoviesRepository } from './infrastructure/adapter';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from './application';
import { BasicCommand } from './infrastructure/command';

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
    BasicCommand,
  ],
})
export class MoviesModule {}
