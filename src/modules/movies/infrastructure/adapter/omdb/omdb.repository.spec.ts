import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { of } from 'rxjs';
import { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { OMDBMoviesRepository } from './omdb.repository';
import { MoviesRepository } from '../../../domain/port';
import { Movie } from '../../../domain/model';
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
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config: { url: '', headers: {} },
    status: 200,
    statusText: '',
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
    beforeEach(() => {
      jest.spyOn(configService, 'get').mockImplementation(() => 'mocked_key');
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() =>
          of<AxiosResponse<OMDBResponse>>(mockedResponse),
        );
    });

    it('should return a Movie instance', async () => {
      const response = await omdbMoviesRepository.getMovieByTitle('Fooo');

      expect(response).toBeInstanceOf(Movie);
    });
  });
});