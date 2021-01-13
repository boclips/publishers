import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import React from 'react';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';

interface Props {
  item: OrderItem;
}
export const OrderItemCard = ({ item }: Props) => {
  const { data: video } = useGetVideosQuery(item.video.id);

  return (
    <div className="flex flex-row mb-4 pb-4 border-b-2">
      {video && video.length > 0 && (
        <>
          <img
            alt="thumbnail"
            className="w-48 h-30 rounded"
            src={video[0]?.playback.links.thumbnail.getOriginalLink()}
          />
          <div className="flex flex-row justify-between flex-grow ml-4">
            <div className="flex flex-col">
              <div className="font-medium">{item?.video?.title}</div>
              <div>ID: {item?.video?.id}</div>
            </div>
            <div>
              {createPriceDisplayValue(
                video[0]?.price?.amount,
                video[0]?.price?.currency,
                navigator.language,
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
