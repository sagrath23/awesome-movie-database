import { Inject, Injectable, Logger } from '@nestjs/common';
import { MoviesRepository } from '../domain/port';

@Injectable()
export class GetMovieByIdUsecase {
  constructor(
    @Inject('MoviesRepository')
    private readonly moviesRepository: MoviesRepository,
  ) {}

  async execute(id: string) {
    Logger.log('execute GetMovieByIdUsecase');

    const result = await this.moviesRepository.getMovieById(id);

    Logger.log(result, 'GetMovieByIdUsecase.execute');

    return result;
  }
}
