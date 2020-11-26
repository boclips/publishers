import { useQuery } from 'react-query';
import { FilterKeys } from '../../types/search/FilterKeys';
import { ApiClientWrapper } from '../../services/apiClientWrapper';
import { ourQueryCache } from './queryCache';

export interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
  filters?: { [key in FilterKeys]: string[] };
}

const doSearch = ({ query, page, pageSize, filters }: SearchQuery) =>
  ApiClientWrapper.get().then((client) => {
    return client.videos.search({
      query,
      page,
      size: pageSize,
      type: filters?.video_type,
      subject: filters?.subject,
    });
  });

const generateSearchKey = ({ query, page, pageSize, filters }: SearchQuery) => [
  'videos',
  { query, page, pageSize, filters },
];

export const useSearchQuery = (searchQuery: SearchQuery) =>
  useQuery(generateSearchKey(searchQuery), () => doSearch(searchQuery));

export const prefetchSearchQuery = (searchQuery: SearchQuery) =>
  ourQueryCache.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(searchQuery),
  );
