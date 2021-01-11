import { BoclipsClient } from 'boclips-api-client';
import { useQuery } from 'react-query';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

export const doGetVideos = (boclipsClient: BoclipsClient, videoIds: any) =>
  boclipsClient.videos
    .search({
      id: videoIds,
    })
    .then((items) => items.page);

export const useGetVideosQuery = (videoIds: any) => {
  const boclipsClient = useBoclipsClient();
  return useQuery(
    ['videos', videoIds],
    async (_, ids) => doGetVideos(boclipsClient, ids),
    {
      enabled: videoIds,
    },
  );
};
