import { SearchResultsSummary } from 'src/components/searchResults/SearchResultsSummary';
import React from 'react';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { VideoCardList } from 'src/components/searchResults/VideoCardList';
import { Skeleton } from 'antd';

interface Props {
  results?: VideoSearchResults;
  query: string;
  handlePageChange: (page: number) => void;
  currentPage: number;
  isFetching: boolean;
}

export function SearchResults({
  results,
  query,
  handlePageChange,
  currentPage,
  isFetching,
}: Props) {
  return (
    <div className="col-start-7 col-end-26">
      <SearchResultsSummary
        count={results?.pageSpec?.totalElements}
        query={query}
      />
      {!isFetching ? (
        <VideoCardList
          videos={results?.page}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalSearchResults={results?.pageSpec?.totalElements}
        />
      ) : (
        results.page.map(() => (
          <div className="mb-8">
            <Skeleton
              key={Math.random()}
              loading
              active
              title={{ width: '100%' }}
              paragraph={{ rows: 2 }}
              avatar={{ shape: 'square', size: 128 }}
            />
          </div>
        ))
      )}
    </div>
  );
}
