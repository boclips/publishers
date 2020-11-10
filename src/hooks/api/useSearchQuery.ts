import { usePaginatedQuery } from 'react-query';
import { ApiClientWrapper } from '../../services/apiClientWrapper';

interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
}

export const useSearchQuery = ({ query, page, pageSize }: SearchQuery) =>
  usePaginatedQuery(['videos', { query, page, pageSize }], () =>
    ApiClientWrapper.get().then((client) => {
      return client.videos.search({ query, page, size: pageSize });
    }),
  );
