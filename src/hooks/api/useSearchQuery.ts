import { useQuery } from 'react-query';
import { ApiClientWrapper } from '../../services/apiClientWrapper';
import { ourQueryCache } from './queryCache';

interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
}

const doSearch = ({ query, page, pageSize }: SearchQuery) =>
  ApiClientWrapper.get().then((client) => {
    return client.videos.search({ query, page, size: pageSize });
  });

const generateSearchKey = ({ query, page, pageSize }: SearchQuery) => [
  'videos',
  { query, page, pageSize },
];

export const useSearchQuery = (searchQuery: SearchQuery) =>
  useQuery(generateSearchKey(searchQuery), () => doSearch(searchQuery));

export const prefetchSearchQuery = (searchQuery: SearchQuery) =>
  ourQueryCache.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(searchQuery),
  );
