import { usePaginatedQuery } from 'react-query';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';
import { BoclipsClient } from 'boclips-api-client';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { FilterKeys } from '../../types/search/FilterKeys';
import { ourQueryCache } from './queryCache';

export interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
  filters?: { [key in FilterKeys]: string[] };
}

const doSearch = (
  boclipsClient: BoclipsClient,
  { query, page, pageSize, filters }: SearchQuery,
) => {
  return boclipsClient.videos.search({
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
};

const generateSearchKey = ({ query, page, pageSize, filters }: SearchQuery) => [
  'videos',
  { query, page, pageSize, filters },
];

export const useSearchQuery = (searchQuery: SearchQuery) => {
  const boclipsClient = useBoclipsClient();

  return usePaginatedQuery<VideoSearchResults, any>(
    generateSearchKey(searchQuery),
    () => doSearch(boclipsClient, searchQuery),
  );
};

export const prefetchSearchQuery = (
  boclipsClient: BoclipsClient,
  searchQuery: SearchQuery,
) =>
  ourQueryCache.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(boclipsClient, searchQuery),
  );
