import { Inject, Injectable } from '@nestjs/common';
import { MoviesRepository } from '../domain/port';
import { Movie } from '../domain/model';

@Injectable()
export class GetMovieByTitleUsecase {
  constructor(
    @Inject('MoviesRepository')
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async execute(title: string): Promise<Movie> {
    return this.moviesRepository.getMovieByTitle(title);
  }
}
