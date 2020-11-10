import { ApiBoclipsClient } from 'boclips-api-client';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import axios from 'axios';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';

export const FakeApiClient = ApiClientWrapper.set(
  ApiBoclipsClient.create(axios, ''),
).then((client) => (client as unknown) as FakeBoclipsClient);
