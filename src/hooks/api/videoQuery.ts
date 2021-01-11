import { useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { getCachedData } from 'src/hooks/api/orderQuery';

export const doGetVideos = (videoIds: any) => {
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

export const useGetVideosQuery = (videoIds: any) => {
  return useQuery(['videos', videoIds], async (_, ids) => doGetVideos(ids), {
    enabled: videoIds,
  });
};

export const useFindOrGetVideo = (videoId: string) => {
  return useQuery(['videos', videoId], () => doGetVideo(videoId), {
    initialData: () => getCachedData('videos')?.find((v) => v.id === videoId),
  });
};
