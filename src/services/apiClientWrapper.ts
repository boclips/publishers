import { BoclipsClient } from 'boclips-api-client';

class ApiClient {
  private client;

  public set(client: Promise<BoclipsClient>): Promise<BoclipsClient> {
    if (!this.client) {
      this.client = client;
    }

    return this.client;
  }

  public get = (): Promise<BoclipsClient> => {
    throw new Error('Used the wrapper!');
    if (!this.client) {
      throw new Error('ApiClient not set yet');
    }
    return this.client;
  };
}

export const ApiClientWrapper = new ApiClient();
