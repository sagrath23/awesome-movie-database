import { SubCommand, CommandRunner, Option } from 'nest-commander';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { Logger } from '@nestjs/common';
import { DefaultMoviesModuleError } from '../../domain/model';

interface FindMovieSubCommandOptions {
  title?: string;
  id?: string;
}

@SubCommand({
  name: 'find',
  description: 'Find a movie by title or IMDB ID',
})
export class FindMoviesSubCommand extends CommandRunner {
  constructor(
    private readonly getMovieByIdUsecase: GetMovieByIdUsecase,
    private readonly getMovieByTitleUsecase: GetMovieByTitleUsecase,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options?: FindMovieSubCommandOptions,
  ): Promise<void> {
    const argument = options?.id ?? options?.title;

    console.info(passedParam, 'params subcommand');
    console.info(options, 'options subcommand');

    if (!argument) {
      Logger.error('No valid argument provided', 'FindMoviesSubCommand.run');

      throw new DefaultMoviesModuleError('invalid arguments');
    }

    const useCase = options?.id
      ? this.getMovieByIdUsecase
      : this.getMovieByTitleUsecase;

    const result = await useCase.execute(argument);

    Logger.debug(result, 'FindMoviesSubCommand.run');

    console.log(JSON.stringify(result));
  }

  @Option({
    flags: '-t, --title [title]',
    description: `Movie's title`,
  })
  parseTitle(val: string): string {
    return val;
  }

  @Option({
    flags: '-i, --id [string]',
    description: `Movie's ID`,
  })
  parseId(val: string): string {
    return val;
  }
}
