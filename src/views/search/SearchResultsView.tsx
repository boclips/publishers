import React, { useCallback, useEffect, useState } from 'react';
import {
  prefetchSearchQuery,
  useSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useLocationParams } from 'src/hooks/useLocationParams';
import { useHistory } from 'react-router-dom';
import Navbar from 'src/components/layout/Navbar';
import { PageLayout } from 'src/components/layout/PageLayout';
import { FilterPanel } from 'src/components/filters/FilterPanel';
import { SearchResults } from 'src/components/searchResults/SearchResults';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const history = useHistory();
  const query = useLocationParams().get('q');
  const [typeFilter, setTypeFilter] = useState<string[]>(
    useLocationParams().getAll('video_type') || [],
  );
  const currentPage = Number(useLocationParams().get('page')) || 1;

  const { data, isError, error, isLoading } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
    video_type: typeFilter,
  });

  useEffect(() => {
    // Prefetch the next page of data
    prefetchSearchQuery({
      query,
      pageSize: PAGE_SIZE,
      page: currentPage,
      video_type: typeFilter,
    });
  }, [currentPage, query, typeFilter]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    let search = `?q=${query}&page=${page}`;
    if (typeFilter.length > 0) {
      search += `&video_type=${typeFilter}`;
    }

    history.push({
      search,
    });
  };

  const handleFilter = useCallback(
    (filter: string, values: string[]) => {
      setTypeFilter(values);
      window.scrollTo({ top: 0 });
      history.push({
        search: `?q=${query}&page=1${
          values.length > 0 ? `&${filter}=` : ''
        }${values}`,
      });
    },
    [history, query],
  );

  return (
    <PageLayout navBar={<Navbar showSearchBar />}>
      <div className="grid grid-cols-12 gap-4">
        {isError ? (
          <div className="col-span-12">{error}</div>
        ) : (
          <>
            <div className="col-start-1 col-end-4">
              {!isLoading && (
                <FilterPanel
                  handleFilter={handleFilter}
                  initialVideoTypeFilters={typeFilter}
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
