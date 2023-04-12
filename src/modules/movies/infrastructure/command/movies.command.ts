import { Command, CommandRunner } from 'nest-commander';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { Logger } from '@nestjs/common';
import { DefaultMoviesModuleError } from '../../domain/model';
import { FindMoviesSubCommand } from './findMovie.subcommand';
import { SetupSubCommand } from './setup.subCommand';

interface BasicCommandOptions {
  title?: string;
  id?: string;
}

@Command({
  name: 'amdb',
  subCommands: [FindMoviesSubCommand, SetupSubCommand],
  description: 'A CLI utitly to get info about any movie',
})
export class MoviesCommand extends CommandRunner {
  constructor(
    private readonly getMovieByIdUsecase: GetMovieByIdUsecase,
    private readonly getMovieByTitleUsecase: GetMovieByTitleUsecase,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    const argument = options?.id ?? options?.title;

    if (!argument) {
      Logger.error('No valid argument provided', 'MoviesCommand.run');

      throw new DefaultMoviesModuleError('invalid arguments');
    }

    const useCase = options?.id
      ? this.getMovieByIdUsecase
      : this.getMovieByTitleUsecase;

    const result = await useCase.execute(argument);

    Logger.debug(result, 'MoviesCommand.run');

    console.log(JSON.stringify(result));
  }
}
