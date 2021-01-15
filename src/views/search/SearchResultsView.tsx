import React, { useEffect } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import Navbar from 'src/components/layout/Navbar';
import { FilterPanel } from 'src/components/filterPanel/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';
import Footer from 'src/components/layout/Footer';
import { FilterKeys } from 'src/types/search/FilterKeys';
import { useQueryClient } from 'react-query';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const queryClient = useQueryClient();
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
    prefetchSearchQuery(queryClient, {
      query,
      pageSize: PAGE_SIZE,
      page: currentPage,
      filters,
    });
  }, [currentPage, query, filters, queryClient]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    setSearchLocation({
      query,
      page,
      filters,
    });
  };

  const handleFilterChange = (key: FilterKeys, values: string[]) => {
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
  };

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <FilterPanel facets={data?.facets} handleChange={handleFilterChange} />
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
