import React from 'react';
import { useGetOrderedVideos } from 'src/hooks/api/videoQuery';
import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';

interface Props {
  items: OrderItem[];
}

const ItemsCount = ({ items }: Props) => {
  return (
    <div className="flex flex-col text-sm text-white absolute text-center z-10">
      {items && items.length > 0 && (
        <>
          <div data-qa="order-item-count" className="font-bold text-5xl">
            {items?.length}
          </div>
          <span className="text-xl">
            {items.length > 1 ? 'videos' : 'video'}
          </span>
        </>
      )}
    </div>
  );
};

export const ItemsThumbnail = ({ items }: Props) => {
  const videoIds = items.map((it: OrderItem) => it.video.id);
  const { data: videos } = useGetOrderedVideos(videoIds);

  const getFirstValidThumbnail = (videoList: Video[]): string => {
    const thumbnailLinks = videoList?.map((it) =>
      it.playback?.links?.thumbnail.getOriginalLink(),
    );
    return thumbnailLinks.find(
      (thumbnail) => thumbnail !== null && thumbnail !== '',
    );
  };

  return (
    <div className="flex justify-center items-start mr-6">
      <ItemsCount items={items} />
      {videos && (
        <>
          <div className="bg-blue-900 h-28 w-44 opacity-55 absolute rounded-md" />
          <img
            data-qa="order-item-thumbnail"
            className="h-28 w-44 rounded-md"
            src={getFirstValidThumbnail(videos)}
            alt="thumbnail"
          />
        </>
      )}
    </div>
  );
};
