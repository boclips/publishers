import { QueryClient, useQuery } from 'react-query';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import Pageable from 'boclips-api-client/dist/sub-clients/common/model/Pageable';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { BoclipsClient } from 'boclips-api-client';

export const doGetVideos = (videoIds: string[], apiClient: BoclipsClient) => {
  return apiClient.videos
    .search({
      id: videoIds,
    })
    .then((items) => items.page);
};

export const doGetVideo = (id: string, apiClient: BoclipsClient) =>
  apiClient.videos.get(id);

export const useGetVideosQuery = (videoIds: string[]) => {
  const apiClient = useBoclipsClient();
  return useQuery('cartItemVideos', () =>
    videoIds?.length > 0 ? doGetVideos(videoIds, apiClient) : null,
  );
};

export const useFindOrGetVideo = (
  queryClient: QueryClient,
  videoId: string,
) => {
  const apiClient = useBoclipsClient();
  const cachedVideos = queryClient.getQueryData<Pageable<Video>>('videos');

  return useQuery(['videos', videoId], () => doGetVideo(videoId, apiClient), {
    initialData: () => cachedVideos?.page.find((v) => v.id === videoId),
  });
};
