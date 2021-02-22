import { BoclipsClient } from 'boclips-api-client';
import { useQuery } from 'react-query';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';

export const doGetUser = (client: BoclipsClient) => {
  return client.users.getCurrentUser();
};

export const useGetUserQuery = () => {
  const client = useBoclipsClient();
  return useQuery('user', async () => doGetUser(client));
};
