import React, { useEffect, useState } from 'react';
import { useGetOrderedVideos } from 'src/hooks/api/videoQuery';
import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import s from './style.module.less';

interface Props {
  items: OrderItem[];
}

export const OrderThumbnail = ({ items }: Props) => {
  const videoIds = items.map((it: OrderItem) => it.video.id);
  const { data: videos } = useGetOrderedVideos(videoIds);
  const count = items.length;

  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    if (videos) {
      const thumbnailLinks = videos?.map((it) =>
        it.playback?.links?.thumbnail.getOriginalLink(),
      );
      const firstValidThumbnail = thumbnailLinks.find(
        (thumbnail) => thumbnail !== null && thumbnail !== '',
      );

      setThumbnailUrl(firstValidThumbnail);
    }
  }, [videos]);

  return (
    <div className="flex flex-grow relative">
      <div
        data-qa="order-item-thumbnail"
        className={s.thumbnail}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      >
        {videos && (
          <div className="text-white z-10 relative flex flex-col h-full items-center justify-center">
            <div
              data-qa="order-item-count"
              className="font-bold text-5xl leading-8"
            >
              {count}
            </div>
            <span className="text-xl">{count > 1 ? 'videos' : 'video'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
