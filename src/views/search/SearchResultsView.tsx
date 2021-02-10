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
import { NoResults } from 'src/components/noResults/NoResults';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const queryClient = useQueryClient();
  const [searchLocation, setSearchLocation] = useSearchQueryLocationParams();
  const { query, page: currentPage, filters } = searchLocation;
  const boclipsClient = useBoclipsClient();

  const { data, isError, error, isLoading } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
    filters,
  });

  useEffect(() => {
    prefetchSearchQuery(
      queryClient,
      {
        query,
        pageSize: PAGE_SIZE,
        page: currentPage,
        filters,
      },
      boclipsClient,
    );
  }, [currentPage, query, filters, queryClient, boclipsClient]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    setSearchLocation({
      query,
      page,
      filters,
    });
  };

  const handleFilterChange = useCallback(
    (key: FilterKey, values: string[]) => {
      const prevValues = filters[key];
      if (prevValues.length !== values.length) {
        setSearchLocation({
          query,
          page: 1,
          filters: {
            ...filters,
            [key]: values,
          },
        });
      }
    },
    [filters, query, setSearchLocation],
  );

  const removeFilter = (key: FilterKey, value: string) => {
    const oldValues = filters[key];
    const newValues = oldValues.filter((it) => value !== it);
    handleFilterChange(key, newValues);
  };

  const filtersApplied = (currentFilters) => {
    return (
      Object.keys(filters).filter((key) => currentFilters[key].length > 0)
        .length > 0
    );
  };

  const numberOfResults = data?.pageSpec?.totalElements;

  const showResultsOrEmptyView = () => {
    return (
      <div className="col-start-7 col-end-26">
        {numberOfResults === 0 ? (
          <NoResults filtersApplied={filtersApplied(filters)} query={query} />
        ) : (
          <SearchResults
            results={data}
            query={query}
            isLoading={isLoading}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <FilterPanel
        facets={data?.facets}
        handleChange={handleFilterChange}
        removeFilter={removeFilter}
      />
      {isError ? (
        <div className="col-start-2 col-end-27">{error && error.message}</div>
      ) : (
        showResultsOrEmptyView()
      )}
      <Footer />
    </div>
  );
};

export default SearchResultsView;
