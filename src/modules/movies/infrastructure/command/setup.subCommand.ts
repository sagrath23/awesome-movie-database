import { Logger } from '@nestjs/common';
import { CommandRunner, InquirerService, SubCommand } from 'nest-commander';
import { KeyringService } from '../keyring';

@SubCommand({
  name: 'setup',
  arguments: '[omdbToken]',
  options: { isDefault: true },
})
export class SetupSubCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly keyringService: KeyringService,
  ) {
    super();
  }

  async run(
    passedParam: string[],
    options: Record<string, string>,
  ): Promise<void> {
    Logger.log('Running setup script', 'SetupSubCommand.run');

    let [token] = passedParam;

    if (!token) {
      Logger.log('Asking for OMDB token', 'SetupSubCommand.run');

      token = (
        await this.inquirerService.ask<{ token: string }>(
          'setup-questions',
          undefined,
        )
      ).token;
    }

    Logger.log('store token in keyring', 'SetupSubCommand.run');

    await this.keyringService.storeToken(token);

    Logger.log('token stored in keyring', 'SetupSubCommand.run');
  }
}
