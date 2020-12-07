import { usePaginatedQuery } from 'react-query';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';
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
      channel: filters?.channel,
      duration: filters?.duration,
      duration_facets: DEFAULT_DURATIONS,
      include_channel_facets: true,
    });
  });

const generateSearchKey = ({ query, page, pageSize, filters }: SearchQuery) => [
  'videos',
  { query, page, pageSize, filters },
];

export const useSearchQuery = (searchQuery: SearchQuery) =>
  usePaginatedQuery<VideoSearchResults, any>(
    generateSearchKey(searchQuery),
    () => doSearch(searchQuery),
  );

export const prefetchSearchQuery = (searchQuery: SearchQuery) =>
  ourQueryCache.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(searchQuery),
  );
