import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FilterKeys } from '../types/search/FilterKeys';

export const useLocationParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export type SearchFilters = { [key in FilterKeys]: string[] };

export interface SearchQueryLocationParams {
  query: string;
  page: number;
  filters: SearchFilters;
}

export const useSearchQueryLocationParams = (): [
  SearchQueryLocationParams,
  (search: SearchQueryLocationParams) => void,
] => {
  const locationParams = useLocationParams();
  const searchQueryLocationParams = {
    query: locationParams.get('q'),
    page: Number(locationParams.get('page')) || 1,
    filters: {
      video_type: locationParams.getAll('video_type'),
      subject: locationParams.getAll('subject'),
      channel: locationParams.getAll('channel'),
      duration: locationParams.getAll('duration'),
      prices: locationParams.getAll('prices'),
    },
  };

  const history = useHistory();
  const setSearchQueryLocationParams = useCallback(
    (search: SearchQueryLocationParams) => {
      const params = convertToURLSearchParams(search);

      history.push({
        search: `?${params.toString()}`,
      });
    },
    [history],
  );

  return [searchQueryLocationParams, setSearchQueryLocationParams];
};

const convertToURLSearchParams = (
  search: SearchQueryLocationParams,
): URLSearchParams => {
  const params = new URLSearchParams();
  params.append('q', search.query);
  params.append('page', `${search.page}`);

  Object.entries(search.filters).forEach(([key, values]) =>
    // We need to loop through filters as you can't append an array for URLSearchParams
    values.forEach((value) => params.append(key, value)),
  );
  return params;
};

export const useGetIdFromLocation = (path: string) => {
  const location = useLocation();
  return location.pathname.split(`/${path}/`)[1];
};
