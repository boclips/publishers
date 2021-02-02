import { QueryClient, useQuery } from 'react-query';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';
import { BoclipsClient } from 'boclips-api-client';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { FilterKeys } from 'src/types/search/FilterKeys';

export interface SearchQuery {
  query: string;
  page: number;
  pageSize: number;
  filters?: { [key in FilterKeys]: string[] };
}

const doSearch = (
  { query, page, pageSize, filters }: SearchQuery,
  apiClient: BoclipsClient,
) =>
  apiClient.videos.search({
    query,
    page,
    size: pageSize,
    prices: filters?.prices,
    type: filters?.video_type,
    subject: filters?.subject,
    channel: filters?.channel,
    duration: filters?.duration,
    duration_facets: DEFAULT_DURATIONS,
    include_channel_facets: true,
  });

const generateSearchKey = ({ query, page, pageSize, filters }: SearchQuery) => [
  'videos',
  { query, page, pageSize, filters },
];

export const useSearchQuery = (searchQuery: SearchQuery) => {
  const apiClient = useBoclipsClient();
  return useQuery<VideoSearchResults, any>(
    generateSearchKey(searchQuery),
    () => doSearch(searchQuery, apiClient),
    {
      keepPreviousData: true,
    },
  );
};
export const prefetchSearchQuery = (
  queryClient: QueryClient,
  searchQuery: SearchQuery,
  boclipsClient: BoclipsClient,
) =>
  queryClient.prefetchQuery(generateSearchKey(searchQuery), () =>
    doSearch(searchQuery, boclipsClient),
  );
