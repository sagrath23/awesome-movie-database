interface OMDBRating {
  Source: string;
  Value: string;
}

export interface OMDBResponse {
  imdbID: string;
  Title: string;
  Released: string;
  Country: string; // separated by comma
  Language: string;
  Plot: string;
  Ratings: Array<OMDBRating>;
  Year?: string;
  Rated?: string;
  Runtime?: string;
  Genre?: string; // separated by comma
  Director?: string; // separated by comma
  Writer?: string; // separated by comma
  Actors?: string; // separated by comma
  Awards?: string;
  Poster?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}
