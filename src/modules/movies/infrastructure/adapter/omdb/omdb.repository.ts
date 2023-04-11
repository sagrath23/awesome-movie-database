import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MoviesRepository } from '../../../domain/port';
import { AxiosError, AxiosResponse } from 'axios';
import { OMDBResponse } from './omdb.response';
import { fromPrimitives } from './omdb.transformer';
import {
  Movie,
  DefaultMoviesModuleError,
  MovieNotFoundError,
} from '../../../domain/model';

@Injectable()
export class OMDBMoviesRepository implements MoviesRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getBasePath() {
    return `${this.configService.get<string>(
      'OMDB_URL',
    )}?apikey=${this.configService.get<string>('OMDB_API_KEY')}`;
  }

  async getMovieByTitle(title: string) {
    const movie = await firstValueFrom(
      this.httpService
        .get<AxiosResponse<OMDBResponse>>(`${this.getBasePath()}&t=${title}`)
        .pipe(
          catchError((error) => {
            Logger.error(error, 'OMDBMoviesRepository.getMovieByTitle');

            if (error instanceof MovieNotFoundError) {
              throw error;
            }

            throw new DefaultMoviesModuleError(error.message);
          }),
          // transform response to domain object
          map<AxiosResponse<OMDBResponse>, Movie>(fromPrimitives),
        ),
    );

    return movie;
  }

  async getMovieById(id: string) {
    const movie = await firstValueFrom(
      this.httpService
        .get<AxiosResponse<OMDBResponse>>(`${this.getBasePath()}&i=${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error, 'OMDBMoviesRepository.getMovieById');

            throw error;
          }),
          // transform response to domain object
          map<AxiosResponse<OMDBResponse>, Movie>(fromPrimitives),
        ),
    );

    return movie;
  }
}
