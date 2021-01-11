import { BoclipsClient } from 'boclips-api-client';
import { useQuery } from 'react-query';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

const doGetUser = (boclipsClient: BoclipsClient) => {
  console.log(boclipsClient.users);
  return boclipsClient.users.getCurrentUser();
};

export const useGetUserQuery = () => {
  const boclipsClient = useBoclipsClient();
  return useQuery('user', () => doGetUser(boclipsClient));
};
