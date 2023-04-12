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
import { KeyringService } from '../../keyring';

@Injectable()
export class OMDBMoviesRepository implements MoviesRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly keyringService: KeyringService,
  ) {}

  async getBasePath() {
    const omdbAPIKey =
      this.configService.get<string>('OMDB_API_KEY') ??
      (await this.keyringService.getToken());

    if (!omdbAPIKey) {
      throw new DefaultMoviesModuleError('No OMDB API Key provided');
    }

    return `http://www.omdbapi.com?apikey=${omdbAPIKey}`;
  }

  async getMovieByTitle(title: string) {
    const path = await this.getBasePath();
    const movie = await firstValueFrom(
      this.httpService
        .get<AxiosResponse<OMDBResponse>>(`${path}&t=${title}`)
        .pipe(
          catchError((error) => {
            Logger.error(error, 'OMDBMoviesRepository.getMovieByTitle');

            if (
              error instanceof MovieNotFoundError ||
              error instanceof DefaultMoviesModuleError
            ) {
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
    const path = await this.getBasePath();
    const movie = await firstValueFrom(
      this.httpService.get<AxiosResponse<OMDBResponse>>(`${path}&i=${id}`).pipe(
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
