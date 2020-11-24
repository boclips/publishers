import { Video } from 'boclips-api-client/dist/types';
import { List } from 'antd';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import { VideoCard } from '@boclips-ui/video-card';
import { Player } from 'boclips-player-react';
import playerOptions from 'src/Player/playerOptions';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import React from 'react';

interface Props {
  videos: Video[];
  totalSearchResults: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export const VideoCardList = ({
  videos,
  totalSearchResults,
  handlePageChange,
  currentPage,
}: Props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        total: totalSearchResults,
        pageSize: PAGE_SIZE,
        showSizeChanger: false,
        onChange: handlePageChange,
        current: currentPage,
      }}
      dataSource={videos}
      renderItem={(video: Video) => (
        <div className="mb-4">
          <VideoCard
            key={video.id}
            videoPlayer={
              <Player
                videoUri={video.links.self.getOriginalLink()}
                borderRadius="4px"
                options={playerOptions}
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
  );
};
