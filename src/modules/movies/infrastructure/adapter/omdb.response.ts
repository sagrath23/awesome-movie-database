interface OMDBRating {
  Source: string;
  Value: string;
}

export interface OMDBResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string; // separated by comma
  Director: string; // separated by comma
  Writer: string; // separated by comma
  Actors: string; // separated by comma
  Plot: string;
  Language: string;
  Country: string; // separated by comma
  Awards: string;
  Poster: string;
  Ratings: Array<OMDBRating>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
