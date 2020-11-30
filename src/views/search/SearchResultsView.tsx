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

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const [searchLocation, setSearchLocation] = useSearchQueryLocationParams();
  const { query, page: currentPage, filters } = searchLocation;

  const { resolvedData, isError, error, isLoading } = useSearchQuery({
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

  return (
    <div className="grid grid-rows-search-view grid-cols-container gap-8 container">
      <Navbar showSearchBar />
      <FilterPanel facets={resolvedData?.facets} />
      {isError ? (
        <div className="col-start-2 col-end-27">{error && error.message}</div>
      ) : (
        <SearchResults
          results={resolvedData}
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
