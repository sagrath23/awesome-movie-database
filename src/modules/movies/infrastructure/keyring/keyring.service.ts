import { Injectable } from '@nestjs/common';
import keytar from 'keytar';

@Injectable()
export class KeyringService {
  private readonly SERVICE_NAME = 'awesome_movie_database';
  private readonly ACCOUNT_NAME = 'omdb_api_token';

  async storeToken(token: string): Promise<void> {
    await keytar.setPassword(this.SERVICE_NAME, this.ACCOUNT_NAME, token);
  }

  async getToken(): Promise<string | null> {
    return keytar.getPassword(this.SERVICE_NAME, this.ACCOUNT_NAME);
  }
}
