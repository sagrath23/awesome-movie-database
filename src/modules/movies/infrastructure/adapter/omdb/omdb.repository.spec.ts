import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { of } from 'rxjs';
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { OMDBMoviesRepository } from './omdb.repository';
import { MoviesRepository } from '../../../domain/port';
import { Movie, MovieNotFoundError } from '../../../domain/model';
import { OMDBResponse } from './omdb.response';

describe('OMDBMoviesRepository', () => {
  let httpService: DeepMocked<HttpService>;
  let configService: ConfigService;
  let omdbMoviesRepository: MoviesRepository;

  const mockedResponse: AxiosResponse<
    OMDBResponse,
    { headers: RawAxiosRequestHeaders }
  > = {
    data: {
      imdbID: 'id',
      Title: 'title',
      Released: 'releaseYear',
      Country: 'country',
      Language: 'language',
      Plot: 'plot',
      Ratings: [],
      Response: 'True',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config: { url: '', headers: {} },
    status: 200,
    statusText: '',
  };

  const mockDependencies = () => {
    jest.spyOn(configService, 'get').mockImplementation(() => 'mocked_key');
    jest
      .spyOn(httpService, 'get')
      .mockImplementationOnce(() =>
        of<AxiosResponse<OMDBResponse>>(mockedResponse),
      );
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        {
          provide: 'MoviesRepository',
          useClass: OMDBMoviesRepository,
        },
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    httpService = moduleRef.get(HttpService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    omdbMoviesRepository = moduleRef.get<MoviesRepository>('MoviesRepository');
  });

  describe('getMovieByTitle', () => {
    beforeEach(mockDependencies);

    it('should return a Movie instance', async () => {
      const response = await omdbMoviesRepository.getMovieByTitle('Fooo');

      expect(response).toBeInstanceOf(Movie);
    });
  });

  describe('getMovieById', () => {
    beforeEach(mockDependencies);

    it('should return a Movie instance', async () => {
      const response = await omdbMoviesRepository.getMovieById('movie-id');

      expect(response).toBeInstanceOf(Movie);
    });
  });

  describe('when OMDB API returns an error', () => {
    beforeEach(() => {
      jest.spyOn(configService, 'get').mockImplementation(() => 'mocked_key');
      jest.spyOn(httpService, 'get').mockImplementationOnce(() =>
        of<AxiosResponse<OMDBResponse>>({
          ...mockedResponse,
          data: { Response: 'False', Error: 'custom-error' },
        }),
      );
    });

    it('should raise an exception', async () => {
      try {
        await omdbMoviesRepository.getMovieByTitle('Fooo');
      } catch (error) {
        expect(error).toBeInstanceOf(MovieNotFoundError);
      }
    });
  });
});
