import React, { useCallback, useEffect } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import Navbar from 'src/components/layout/Navbar';
import { PageLayout } from 'src/components/layout/PageLayout';
import { FilterPanel } from 'src/components/filters/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';
import { FilterKeys } from 'src/types/search/FilterKeys';

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
    <PageLayout navBar={<Navbar showSearchBar />}>
      <div className="grid grid-cols-12 gap-4">
        {isError ? (
          <div className="col-span-12">{error && error.message}</div>
        ) : (
          <>
            <div className="col-start-1 col-end-4">
              {!isLoading && (
                <FilterPanel
                  handleFilter={handleFilter}
                  initialVideoTypeFilters={filters.video_type}
                  initialSubjectFilters={filters.subject}
                  initialChannelFilters={filters.channel}
                  facets={data?.facets}
                />
              )}
            </div>
            <div className="col-start-4 col-end-13">
              <SearchResults
                results={data}
                query={query}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResultsView;
