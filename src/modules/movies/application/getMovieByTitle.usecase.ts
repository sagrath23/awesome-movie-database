import { Inject, Injectable } from '@nestjs/common';
import { MoviesRepository } from '../domain/port';

@Injectable()
export class GetMovieByTitleUsecase {
  constructor(
    @Inject('MoviesRepository')
    private readonly moviesRepository: MoviesRepository,
  ) {}
  async execute(title: string) {
    return this.moviesRepository.getMovieByTitle(title);
  }
}
