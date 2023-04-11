import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from '../../domain/port';
import { Movie } from '../../domain/model';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { MovieBuilder } from '../../domain/model';

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesRepository: MoviesRepository;

  const mockDependencies = () => {
    jest
      .spyOn(moviesRepository, 'getMovieById')
      .mockImplementation(() => MovieBuilder.aMovieBuilder().build());
    jest
      .spyOn(moviesRepository, 'getMovieByTitle')
      .mockImplementation(() => MovieBuilder.aMovieBuilder().build());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: 'MoviesRepository',
          useValue: createMock<MoviesRepository>(),
        },
        GetMovieByIdUsecase,
        GetMovieByTitleUsecase,
      ],
    }).compile();

    moviesController = moduleRef.get<MoviesController>(MoviesController);
    moviesRepository = moduleRef.get<MoviesRepository>('MoviesRepository');
  });

  describe('getMovieById', () => {
    beforeEach(mockDependencies);

    it('should return a Movie instance', async () => {
      const response = await moviesController.getMovieByTitle('Fooo');

      expect(response).toBeInstanceOf(Movie);
    });
  });

  describe('getMovieById', () => {
    beforeEach(mockDependencies);

    it('should return a Movie instance', async () => {
      const response = await moviesController.getMovieById('movie-id');

      expect(response).toBeInstanceOf(Movie);
    });
  });
});
