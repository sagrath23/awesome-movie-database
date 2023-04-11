import { TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { CommandTestFactory } from 'nest-commander-testing';
import { MoviesRepository } from '../../domain/port';
import { MoviesModule } from '../../movies.module';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { MovieBuilder, DefaultMoviesModuleError } from '../../domain/model';

describe('Task Command', () => {
  let commandInstance: TestingModule;
  let moviesRepository: MoviesRepository;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [MoviesModule],
      providers: [
        {
          provide: 'MoviesRepository',
          useValue: createMock<MoviesRepository>(),
        },
        GetMovieByIdUsecase,
        GetMovieByTitleUsecase,
      ],
    }).compile();

    moviesRepository =
      commandInstance.get<MoviesRepository>('MoviesRepository');
  });

  afterEach(() => jest.clearAllMocks());

  describe('when no arguments was provided', () => {
    it('should raise an exception', async () => {
      const consoleSpy = jest.spyOn(console, 'log');

      try {
        await CommandTestFactory.run(commandInstance, ['amdb']);
      } catch (error) {
        expect(consoleSpy).not.toBeCalled();
        expect(error).toBeInstanceOf(DefaultMoviesModuleError);
      }
    });
  });

  describe('amdb -i', () => {
    beforeEach(() => {
      jest
        .spyOn(moviesRepository, 'getMovieById')
        .mockImplementation(() => MovieBuilder.aMovieBuilder().build());
    });

    it('should call the command using id option', async () => {
      const consoleSpy = jest.spyOn(console, 'log');

      await CommandTestFactory.run(commandInstance, ['amdb', '-i', 'movie-id']);

      expect(consoleSpy).toBeCalledWith(
        JSON.stringify(MovieBuilder.aMovieBuilder().build()),
      );
    });
  });

  describe('amdb -t', () => {
    beforeEach(() => {
      jest
        .spyOn(moviesRepository, 'getMovieByTitle')
        .mockImplementation(() => MovieBuilder.aMovieBuilder().build());
    });

    it('should call the command using id option', async () => {
      const consoleSpy = jest.spyOn(console, 'log');

      await CommandTestFactory.run(commandInstance, ['amdb', '-t', 'movie-id']);

      expect(consoleSpy).toBeCalledWith(
        JSON.stringify(MovieBuilder.aMovieBuilder().build()),
      );
    });
  });
});
