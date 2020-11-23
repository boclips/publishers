import { useQuery } from 'react-query';
import { ApiClientWrapper } from '../../services/apiClientWrapper';
import { ourQueryCache } from './queryCache';

interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
  video_type?: string[];
}

const doSearch = ({ query, page, pageSize, video_type }: SearchQuery) =>
  ApiClientWrapper.get().then((client) => {
    return client.videos.search({
      query,
      page,
      size: pageSize,
      type: video_type,
    });
  });

const generateSearchKey = ({
  query,
  page,
  pageSize,
  video_type,
}: SearchQuery) => ['videos', { query, page, pageSize, video_type }];

export const useSearchQuery = (searchQuery: SearchQuery) =>
  useQuery(generateSearchKey(searchQuery), () => doSearch(searchQuery));

export const prefetchSearchQuery = (searchQuery: SearchQuery) =>
  ourQueryCache.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(searchQuery),
  );
