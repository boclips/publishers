import React, { useCallback, useEffect } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import Navbar from 'src/components/layout/Navbar';
import { FilterPanel } from 'src/components/filterPanel/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';
import { FilterKeys } from 'src/types/search/FilterKeys';
import Footer from 'src/components/layout/Footer';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const [searchLocation, setSearchLocation] = useSearchQueryLocationParams();
  const { query, page: currentPage, filters } = searchLocation;

  const { data, isError, error, isLoading } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
    filters,
  });

  useEffect(() => {
    // Prefetch the next page of data
    prefetchSearchQuery({
      query,
      pageSize: PAGE_SIZE,
      page: currentPage,
      filters,
    });
  }, [currentPage, query, filters]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    setSearchLocation({
      query,
      page,
      filters,
    });
  };

  const handleFilter = useCallback(
    (key: FilterKeys, values: string[]) => {
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
    [setSearchLocation, query, filters],
  );

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8 container">
      <Navbar showSearchBar />
      {!isLoading && (
        <FilterPanel
          handleFilter={handleFilter}
          initialVideoTypeFilters={filters.video_type}
          initialSubjectFilters={filters.subject}
          initialChannelFilters={filters.channel}
          facets={data?.facets}
        />
      )}
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
