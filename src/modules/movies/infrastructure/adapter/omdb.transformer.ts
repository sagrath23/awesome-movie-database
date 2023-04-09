import { AxiosResponse } from 'axios';
import { Movie, MovieRating } from '../../domain/model';

export const fromPrimitives = ({ data }: AxiosResponse): Movie => {
  const {
    imdbID: id,
    Title: title,
    Released: releaseYear,
    Country: country,
    Language: language,
    Plot: plot,
    Ratings,
  } = data;

  return new Movie({
    id,
    title,
    releaseYear,
    ratingList:
      Ratings?.map(({ Source, Value }) => new MovieRating(Source, Value)) ?? [],
    country,
    language,
    plot,
  });
};
