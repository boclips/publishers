import React, { useCallback, useEffect, useState } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import {
  SearchFilters,
  useSearchQueryLocationParams,
} from 'src/hooks/useLocationParams';
import Navbar from 'src/components/layout/Navbar';
import { FilterPanel } from 'src/components/filterPanel/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';
import Footer from 'src/components/layout/Footer';
import { FilterKey } from 'src/types/search/FilterKey';
import { useQueryClient } from 'react-query';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';
import { NoSearchResults } from 'src/components/noResults/NoSearchResults';
import { Loading } from 'src/components/common/Loading';
import { useDebounce } from 'src/hooks/useDebounce';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import { ErrorBoundary } from 'src/components/common/errors/ErrorBoundary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const queryClient = useQueryClient();
  const [searchLocation, setSearchLocation] = useSearchQueryLocationParams();
  const { query, page: currentPage, filters: filtersFromURL } = searchLocation;
  const [newFiltersBeforeDebounce, setNewFiltersBeforeDebounce] = useState<
    SearchFilters
  >(filtersFromURL);

  const debouncedFilters = useDebounce(newFiltersBeforeDebounce, 1000);

  const boclipsClient = useBoclipsClient();

  const { data, isLoading, isFetching, isPreviousData } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
    filters: debouncedFilters,
  });

  useEffect(() => {
    // Prefetch the next page of data
    prefetchSearchQuery(
      queryClient,
      {
        query,
        pageSize: PAGE_SIZE,
        page: currentPage,
        filters: debouncedFilters,
      },
      boclipsClient,
    );
  }, [currentPage, query, debouncedFilters, queryClient, boclipsClient]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });

    setSearchLocation({
      query,
      page,
      filters: filtersFromURL,
    });
  };

  const handleFilterChange = useCallback(
    (key: FilterKey, values: string[]) => {
      const prevValues = filtersFromURL[key];
      if (prevValues.length !== values.length) {
        const newFilters = {
          ...filtersFromURL,
          [key]: values,
        };
        setSearchLocation({
          query,
          page: 1,
          filters: newFilters,
        });
        setNewFiltersBeforeDebounce(newFilters);
        AnalyticsFactory.getAppcues().sendEvent(AppcuesEvent.FILTERS_APPLIED, {
          filters: newFilters,
        });
      }
    },
    [filtersFromURL, query, setSearchLocation],
  );

  const removeFilter = (key: FilterKey, value: string) => {
    const oldValues = filtersFromURL[key];
    const newValues = oldValues.filter((it) => value !== it);
    handleFilterChange(key, newValues);
  };

  const removeAllFilters = useCallback(() => {
    const emptyFilters = {
      duration: [],
      video_type: [],
      channel: [],
      subject: [],
      prices: [],
    };

    setSearchLocation({
      query,
      page: 1,
      filters: emptyFilters,
    });
    setNewFiltersBeforeDebounce(emptyFilters);
  }, [query, setSearchLocation]);

  const isNoSearchResults = data?.pageSpec?.totalElements === 0;

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <ErrorBoundary
        fallback={
          <div className="row-start-2 row-end-2 col-start-2 col-end-26">
            <RefreshPageError />
          </div>
        }
      >
        <FilterPanel
          facets={data?.facets}
          handleChange={handleFilterChange}
          removeFilter={removeFilter}
          removeAllFilters={removeAllFilters}
          noResults={isNoSearchResults}
          areFiltersApplied={areFiltersApplied(filtersFromURL)}
        />

        {isNoSearchResults ? (
          <NoSearchResults
            areFiltersApplied={areFiltersApplied(filtersFromURL)}
            query={query}
          />
        ) : (
          <SearchResults
            results={data}
            query={query}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            isFetching={isFetching && isPreviousData}
          />
        )}
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

const areFiltersApplied = (currentFilters: SearchFilters): boolean => {
  return (
    Object.keys(currentFilters).find((key) => currentFilters[key]?.length > 0)
      ?.length > 0
  );
};

export default SearchResultsView;
