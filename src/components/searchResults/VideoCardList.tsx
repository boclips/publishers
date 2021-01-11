import { Video } from 'boclips-api-client/dist/types';
import { List } from 'antd';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import React from 'react';
import { VideoCardWrapper } from 'src/components/videoCard/VideoCardWrapper';
import s from 'src/components/videoCard/VideoCardWrapper.module.less';
import { Link } from 'react-router-dom';

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
        <Link
          className="mb-4"
          data-qa="video-card-wrapper"
          to={`videos/${video.id}`}
        >
          <VideoCardWrapper video={video} />
        </Link>
      )}
    />
  );
};
