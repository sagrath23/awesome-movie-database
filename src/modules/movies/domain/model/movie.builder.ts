import { Movie, MovieRating } from './movie.model';

export class MovieBuilder {
  // static values to use in mock
  private static readonly ID = 'movie-id';
  private static readonly TITLE = 'A mocked Movie Title';
  private static readonly RELEASE_YEAR = '2023';
  private static readonly COUNTRY = 'a-mocked-country';
  private static readonly LANGUAGE = 'a-mocked-language';
  private static readonly PLOT =
    'A mocked plot for our mocked movie released on a mocked date';
  private static readonly RATINGS = [new MovieRating('mocked-vendor', '5/5')];
  private static readonly ACTORS = ['mocked actor # 1', 'mocked actor # 2'];

  private readonly id: string;
  private readonly title: string;
  private readonly releaseYear: string;
  private readonly ratingList: Array<MovieRating>;
  private readonly country: string;
  private readonly language: string;
  private readonly plot: string;
  private readonly actors: Array<string>;

  constructor() {
    this.id = MovieBuilder.ID;
    this.title = MovieBuilder.TITLE;
    this.releaseYear = MovieBuilder.RELEASE_YEAR;
    this.ratingList = MovieBuilder.RATINGS;
    this.country = MovieBuilder.COUNTRY;
    this.language = MovieBuilder.LANGUAGE;
    this.plot = MovieBuilder.PLOT;
    this.actors = MovieBuilder.ACTORS;
  }

  static aMovieBuilder() {
    return new MovieBuilder();
  }

  build() {
    return new Movie({
      id: this.id,
      title: this.title,
      releaseYear: this.releaseYear,
      ratingList: this.ratingList,
      country: this.country,
      language: this.language,
      plot: this.plot,
      actors: this.actors,
    });
  }
}
