import { Command, CommandRunner, Option } from 'nest-commander';
import { GetMovieByIdUsecase, GetMovieByTitleUsecase } from '../../application';
import { Logger } from '@nestjs/common';

interface BasicCommandOptions {
  title?: string;
  id?: string;
}

@Command({
  name: 'amdb',
  description: 'A CLI utitly to get info about any movie',
})
export class BasicCommand extends CommandRunner {
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
      // TODO: raise an exception here
      Logger.error('No valid argument provided');

      throw new Error();
    }

    const useCase = options?.id
      ? this.getMovieByIdUsecase
      : this.getMovieByTitleUsecase;

    await useCase.execute(argument);
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
