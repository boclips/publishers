import React, { useCallback, useEffect } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import Navbar from 'src/components/layout/Navbar';
import { FilterPanel } from 'src/components/filterPanel/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';
import Footer from 'src/components/layout/Footer';
import { FilterKey } from 'src/types/search/FilterKey';
import { useQueryClient } from 'react-query';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const queryClient = useQueryClient();
  const [searchLocation, setSearchLocation] = useSearchQueryLocationParams();
  const { query, page: currentPage, filters: filtersFromURL } = searchLocation;
  const boclipsClient = useBoclipsClient();

  const { data, isError, error, isLoading } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
    filters: filtersFromURL,
  });

  useEffect(() => {
    // Prefetch the next page of data
    prefetchSearchQuery(
      queryClient,
      {
        query,
        pageSize: PAGE_SIZE,
        page: currentPage,
        filters: filtersFromURL,
      },
      boclipsClient,
    );
  }, [currentPage, query, filtersFromURL, queryClient, boclipsClient]);

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
      console.log("calling handle filter change")
      const prevValues = filtersFromURL[key];
      if (prevValues.length !== values.length) {
        setSearchLocation({
          query,
          page: 1,
          filters: {
            ...filtersFromURL,
            [key]: values,
          },
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
    setSearchLocation({
      query,
      page: 1,
      filters: {
        duration: [],
        video_type: [],
        channel: [],
        subject: [],
        prices: [],
      },
    });

    },
    [query, setSearchLocation],
  );

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <FilterPanel
        facets={data?.facets}
        handleChange={handleFilterChange}
        removeFilter={removeFilter}
        removeAllFilters={removeAllFilters}
      />
      {isError ? (
        <div className="col-start-2 col-end-27">{error && error.message}</div>
      ) : (
        <SearchResults
          results={data}
          query={query}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
      <Footer />
    </div>
  );
};

export default SearchResultsView;
