import { Injectable, Logger } from '@nestjs/common';
import * as keytar from 'keytar';

@Injectable()
export class KeyringService {
  private readonly SERVICE_NAME = 'awesome_movie_database';
  private readonly ACCOUNT_NAME = 'omdb_api_token';

  async storeToken(token: string): Promise<void> {
    Logger.log(
      `trying to store token in keychain`,
      'KeyringService.storeToken',
    );

    await keytar.setPassword(this.SERVICE_NAME, this.ACCOUNT_NAME, token);

    Logger.log('token saved', 'KeyringService.storeToken');
  }

  async getToken(): Promise<string | null> {
    return keytar.getPassword(this.SERVICE_NAME, this.ACCOUNT_NAME);
  }
}
