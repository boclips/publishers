import { QueryClient, useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import Pageable from 'boclips-api-client/dist/sub-clients/common/model/Pageable';

export const doGetVideos = (videoIds: string[]) => {
  return ApiClientWrapper.get()
    .then((client) => {
      return client.videos.search({
        id: videoIds,
      });
    })
    .then((items) => items.page);
};

export const doGetVideo = (id: string) =>
  ApiClientWrapper.get().then((client) => {
    return client.videos.get(id);
  });

export const useGetVideosQuery = (videoIds: string[]) => {
  return useQuery(['videos', videoIds], () => doGetVideos(videoIds), {
    enabled: !!videoIds,
  });
};

export const useFindOrGetVideo = (
  queryClient: QueryClient,
  videoId: string,
) => {
  const cachedVideos = queryClient.getQueryData<Pageable<Video>>('videos');
  return useQuery(['videos', videoId], () => doGetVideo(videoId), {
    initialData: () => cachedVideos?.page.find((v) => v.id === videoId),
  });
};
