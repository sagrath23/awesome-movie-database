import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MoviesRepository } from '../../domain/port';
import { AxiosError } from 'axios';
import { OMDBResponse } from './omdb.response';

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
    const { data } = await firstValueFrom(
      this.httpService
        .get<OMDBResponse>(`${this.getBasePath()}&t=${title}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error, 'OMDBMoviesRepository.getMovieByTitle');

            throw error;
          }),
        ),
    );

    console.log(data, 'OMDBMoviesRepository.getMovieByTitle');

    return data;
  }

  async getMovieById(id: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<OMDBResponse>(`${this.getBasePath()}&i=${id}`).pipe(
        catchError((error: AxiosError) => {
          console.log(error, 'OMDBMoviesRepository.getMovieById');

          throw error;
        }),
      ),
    );

    console.log(data, 'OMDBMoviesRepository.getMovieById');

    return data;
  }
}
