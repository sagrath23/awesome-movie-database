export class BaseMovieError extends Error {
  constructor(message) {
    super(`Movies Module Error: ${message}`);
  }
}

export class MovieNotFoundError extends BaseMovieError {
  constructor() {
    super(`Cannot find any movie with provided data`);
  }
}

export class DefaultMoviesModuleError extends BaseMovieError {
  constructor(message) {
    super(message);
  }
}
