import { VideoCard } from '@boclips-ui/video-card';
import { List } from 'antd';
import PageSpec from 'boclips-api-client/dist/sub-clients/common/model/PageSpec';
import { Video } from 'boclips-api-client/dist/types';
import React from 'react';
import { useSearchQuery } from 'src/hooks/api/useSearchQuery';
import { useLocationParams } from 'src/hooks/useLocationParams';
import { useHistory } from 'react-router-dom';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import { Player } from 'boclips-player-react';
import { Search } from 'src/components/Search/SearchBar';

const SearchResultsView = () => {
  const history = useHistory();
  const query = useLocationParams().get('q');
  const currentPage = Number(useLocationParams().get('page')) || 1;

  const { resolvedData, isError, error, isFetching } = useSearchQuery({
    query,
    page: currentPage - 1,
    pageSize: 10,
  });

  return isError ? (
    <div>{error}</div>
  ) : (
    <div>
      <Search />
      <SearchResultsDescription
        pageSpec={resolvedData?.pageSpec}
        query={query}
      />
      <List
        itemLayout="vertical"
        size="large"
        // className={s.listWrapper}
        // locale={{ emptyText: <EmptyList theme="lti" /> }}
        pagination={{
          total: resolvedData?.pageSpec?.totalElements,
          pageSize: 10,
          showSizeChanger: false,
          onChange: (page) => {
            history.push({
              search: `?q=${query}&page=${page}`,
            });
            // scrollToTop();
          },
          current: currentPage,
        }}
        dataSource={resolvedData?.page}
        renderItem={(video: Video) => (
          <VideoCard
            key={video.id}
            videoPlayer={
              <Player videoUri={video.links.self.getOriginalLink()} />
            }
            video={convertVideoFromApi(video)}
            loading={isFetching}
            authenticated
            hideAttachments
            hideBestFor
            theme="lti"
          />
        )}
      />
    </div>
  );
};

interface Props {
  pageSpec: PageSpec;
  query: string;
}

const SearchResultsDescription = ({ pageSpec, query }: Props) => {
  return (
    <span>
      Showing <span data-qa="search-hits">{pageSpec?.totalElements}</span>{' '}
      videos for &quot;{query}
      &quot;
    </span>
  );
};

export default SearchResultsView;
