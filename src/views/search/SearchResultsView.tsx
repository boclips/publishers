import { VideoCard } from '@boclips-ui/video-card';
import { VideoCardsPlaceholder } from '@boclips-ui/video-card-placeholder';
import { List } from 'antd';
import { Video } from 'boclips-api-client/dist/types';
import React, { useEffect } from 'react';
import {
  useSearchQuery,
  prefetchSearchQuery,
} from 'src/hooks/api/useSearchQuery';
import { useLocationParams } from 'src/hooks/useLocationParams';
import { useHistory } from 'react-router-dom';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import { Player } from 'boclips-player-react';
import Navbar from 'src/components/layout/Navbar';
import { PageLayout } from 'src/components/layout/PageLayout';
import { SearchResultsSummary } from 'src/components/searchResults/SearchResultsSummary';

export const PAGE_SIZE = 10;

const SearchResultsView = () => {
  const history = useHistory();
  const query = useLocationParams().get('q');
  const currentPage = Number(useLocationParams().get('page')) || 1;

  const { data, isError, error, isLoading } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    // Prefetch the next page of data
    prefetchSearchQuery({
      query,
      pageSize: PAGE_SIZE,
      page: currentPage,
    });
  }, [currentPage, query]);

  const handleChange = (page: number) => {
    window.scrollTo({ top: 0 });
    history.push({
      search: `?q=${query}&page=${page}`,
    });
  };

  return (
    <PageLayout navBar={<Navbar showSearchBar />}>
      <div className="grid grid-cols-12 gap-4">
        {isError ? (
          <div className="col-span-12">{error}</div>
        ) : (
          <>
            <div className="col-start-1 col-end-4">filters</div>
            <div className="col-start-4 col-end-13">
              <SearchResultsSummary
                count={data?.pageSpec?.totalElements}
                query={query}
              />
              {isLoading ? (
                <VideoCardsPlaceholder />
              ) : (
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    total: data?.pageSpec?.totalElements,
                    pageSize: PAGE_SIZE,
                    showSizeChanger: false,
                    onChange: handleChange,
                    current: currentPage,
                  }}
                  dataSource={data?.page}
                  renderItem={(video: Video) => (
                    <div className="mb-4">
                      <VideoCard
                        key={video.id}
                        videoPlayer={
                          <Player
                            videoUri={video.links.self.getOriginalLink()}
                          />
                        }
                        border="bottom"
                        video={convertVideoFromApi(video)}
                        authenticated
                        hideAttachments
                        hideBestFor
                        theme="publishers"
                        videoRoundedCorners
                      />
                    </div>
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResultsView;
