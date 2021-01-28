import { Video } from 'boclips-api-client/dist/types';
import { List } from 'antd';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import React from 'react';
import { VideoCardWrapper } from 'src/components/videoCard/VideoCardWrapper';
import s from './VideoCardList.module.less';
import NextArrow from '../../resources/icons/pagination-next-arrow.svg';
import PreviousArrow from '../../resources/icons/pagination-prev-arrow.svg';

interface Props {
  videos: Video[];
  totalSearchResults: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

const itemRender = (_current, type, originalElement) => {
  if (type === 'prev') {
    return (
      <div className="flex flex-row font-bold text-gray-500 border-2 rounded border-gray-400 items-center px-3 w-20 justify-between">
        <PreviousArrow className="w-4" />
        <span>Prev</span>
      </div>
    );
  }
  if (type === 'next') {
    return (
      <div className="flex flex-row font-bold text-blue-800 border-2 rounded border-gray-300 items-center px-3 w-20 justify-between">
        <span>Next</span>
        <NextArrow className="w-4" />
      </div>
    );
  }
  return originalElement;
};

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
        className: s.videoListPagination,
        itemRender,
      }}
      dataSource={videos}
      renderItem={(video: Video) => (
        <div className="mb-4" data-qa="video-card-wrapper">
          <VideoCardWrapper video={video} />
        </div>
      )}
    />
  );
};
