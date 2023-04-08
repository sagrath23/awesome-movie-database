export interface MoviesRepository {
  getMovieByTitle(title: string);

  getMovieById(id: string);
}
