import { SubCommand, CommandRunner, Option } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { DefaultMoviesModuleError } from '../../domain/model';
import { fluentFormat } from '../format';

interface FindMovieSubCommandOptions {
  title?: string;
  id?: string;
  format?: string;
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

    if (!argument) {
      Logger.error('No valid argument provided', 'FindMoviesSubCommand.run');

      throw new DefaultMoviesModuleError('invalid arguments');
    }

    const useCase = options?.id
      ? this.getMovieByIdUsecase
      : this.getMovieByTitleUsecase;

    const result = await useCase.execute(argument);

    Logger.debug(result, 'FindMoviesSubCommand.run');

    // TODO: add format option to parse output nicely
    const formatter =
      options?.format === 'json' ? JSON.stringify : fluentFormat;
    console.log(formatter(result));
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

  @Option({
    flags: '-f, --format [string]',
    description: `Output format (fluent or json)`,
  })
  parseFormat(val: string): string {
    return val;
  }
}
