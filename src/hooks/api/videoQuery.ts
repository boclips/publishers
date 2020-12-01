import { useQuery } from 'react-query';
import { ApiClientWrapper } from 'src/services/apiClientWrapper';

export const doGetVideos = (videoIds: any) => {
  return ApiClientWrapper.get()
    .then((client) => {
      return client.videos.search({
        id: videoIds,
      });
    })
    .then((items) => items.page);
};

export const useGetVideosQuery = (videoIds: any) => {
  return useQuery(['videos', videoIds], async (_, ids) => doGetVideos(ids), {
    enabled: videoIds,
  });
};
