import { Controller, Get, Param, Query, Version } from '@nestjs/common';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';

@Controller('movie')
export class MoviesController {
  constructor(
    private readonly getMovieByIdUsecase: GetMovieByIdUsecase,
    private readonly getMovieByTitleUsecase: GetMovieByTitleUsecase,
  ) {}

  @Version('1')
  @Get(':id')
  async getMovieById(@Param('id') id) {
    return this.getMovieByIdUsecase.execute(id);
  }

  @Version('1')
  @Get()
  async getMovieByTitle(@Query('title') title) {
    return this.getMovieByTitleUsecase.execute(title);
  }
}
