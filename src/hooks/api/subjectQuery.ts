import { BoclipsClient } from 'boclips-api-client';
import { useQuery } from 'react-query';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';

export const getSubjectsQuery = (client: BoclipsClient) => {
  return client.subjects.getAll();
};

export const useGetSubjectsQuery = () => {
  const client = useBoclipsClient();
  return useQuery('subjects', async () => getSubjectsQuery(client));
};
