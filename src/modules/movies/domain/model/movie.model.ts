export class MovieRating {
  readonly vendor: string;
  readonly rating: string;

  constructor(vendor: string, rating: string) {
    this.vendor = vendor;
    this.rating = rating;
  }
}

export class Movie {
  readonly id: string;
  readonly title: string;
  readonly releaseYear: string;
  readonly ratingList: Array<MovieRating>;
  readonly country: string;
  readonly language: string;
  readonly plot: string;
  readonly actors: Array<string>;

  constructor({
    id,
    title,
    releaseYear,
    ratingList,
    country,
    language,
    plot,
  }: {
    id: string;
    title: string;
    releaseYear: string;
    ratingList: Array<MovieRating>;
    country: string;
    language: string;
    plot: string;
  }) {
    this.id = id;
    this.title = title;
    this.releaseYear = releaseYear;
    this.ratingList = ratingList;
    this.country = country;
    this.language = language;
    this.plot = plot;
  }
}
