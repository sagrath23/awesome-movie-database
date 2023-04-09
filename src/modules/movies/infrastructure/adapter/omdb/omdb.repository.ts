import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MoviesRepository } from '../../../domain/port';
import { AxiosError, AxiosResponse } from 'axios';
import { OMDBResponse } from './omdb.response';
import { fromPrimitives } from './omdb.transformer';
import { Movie } from '../../../domain/model';

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
    console.log(title, 'here');
    const movie = await firstValueFrom(
      this.httpService
        .get<AxiosResponse<OMDBResponse>>(`${this.getBasePath()}&t=${title}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error, 'OMDBMoviesRepository.getMovieByTitle');

            throw error;
          }),
          // transform response to domain object
          map<AxiosResponse<OMDBResponse>, Movie>(fromPrimitives),
        ),
    );

    console.log(movie, 'OMDBMoviesRepository.getMovieByTitle');

    return movie;
  }

  async getMovieById(id: string) {
    const movie = await firstValueFrom(
      this.httpService
        .get<AxiosResponse<OMDBResponse>>(`${this.getBasePath()}&i=${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error, 'OMDBMoviesRepository.getMovieById');

            throw error;
          }),
          // transform response to domain object
          map<AxiosResponse<OMDBResponse>, Movie>(fromPrimitives),
        ),
    );

    console.log(movie, 'OMDBMoviesRepository.getMovieById');

    return movie;
  }
}
