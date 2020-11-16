import { VideoCard } from '@boclips-ui/video-card';
import { VideoCardsPlaceholder } from '@boclips-ui/video-card-placeholder';
import { List } from 'antd';
import { Video } from 'boclips-api-client/dist/types';
import React from 'react';
import { useSearchQuery } from 'src/hooks/api/useSearchQuery';
import { useLocationParams } from 'src/hooks/useLocationParams';
import { useHistory } from 'react-router-dom';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import { Player } from 'boclips-player-react';
import Navbar from 'src/components/layout/Navbar';
import { PageLayout } from 'src/components/layout/PageLayout';
import { SearchResultsSummary } from 'src/components/searchResults/SearchResultsSummary';

const SearchResultsView = () => {
  const history = useHistory();
  const query = useLocationParams().get('q');
  const currentPage = Number(useLocationParams().get('page')) || 1;

  const { resolvedData, isError, error, isFetching } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: 10,
  });

  const handleChange = (page: number) => {
    window.scrollTo({ top: 0 });
    history.push({
      search: `?q=${query}&page=${page}`,
    });
  };

  return (
    <PageLayout navBar={<Navbar showSearchBar />}>
      <div className="py-10">
        {isError ? (
          <div>{error}</div>
        ) : (
          <div>
            <SearchResultsSummary
              count={resolvedData?.pageSpec?.totalElements}
              query={query}
            />
            {isFetching ? (
              <VideoCardsPlaceholder />
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  total: resolvedData?.pageSpec?.totalElements,
                  pageSize: 10,
                  showSizeChanger: false,
                  onChange: handleChange,
                  current: currentPage,
                }}
                dataSource={resolvedData?.page}
                renderItem={(video: Video) => (
                  <div className="mb-4">
                    <VideoCard
                      key={video.id}
                      videoPlayer={
                        <Player videoUri={video.links.self.getOriginalLink()} />
                      }
                      border="bottom"
                      video={convertVideoFromApi(video)}
                      authenticated
                      hideAttachments
                      hideBestFor
                      theme="lti"
                    />
                  </div>
                )}
              />
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResultsView;
