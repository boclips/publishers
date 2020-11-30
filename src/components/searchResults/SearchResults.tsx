import { SearchResultsSummary } from 'src/components/searchResults/SearchResultsSummary';
import { VideoCardsPlaceholder } from '@boclips-ui/video-card-placeholder';
import React from 'react';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { VideoCardList } from 'src/components/searchResults/VideoCardList';

interface Props {
  results?: VideoSearchResults;
  query: string;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export function SearchResults({
  results,
  query,
  isLoading,
  handlePageChange,
  currentPage,
}: Props) {
  return (
    <div className="col-start-7 col-end-26">
      <SearchResultsSummary
        count={results?.pageSpec?.totalElements}
        query={query}
      />
      {isLoading ? (
        <VideoCardsPlaceholder />
      ) : (
        <VideoCardList
          videos={results?.page}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalSearchResults={results?.pageSpec?.totalElements}
        />
      )}
    </div>
  );
}
