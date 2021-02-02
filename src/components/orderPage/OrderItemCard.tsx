import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import React from 'react';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';

interface Props {
  item: OrderItem;
}

export const OrderItemCard = ({ item }: Props) => {
  const { data: video } = useFindOrGetVideo(item.video.id);

  return (
    <div className="flex flex-row mb-4 pb-4 border-b-2 h-32">
      {video && (
        <>
          <img
            alt="thumbnail"
            className="w-48 rounded"
            src={video?.playback.links.thumbnail.getOriginalLink()}
          />
          <div className="flex flex-row justify-between flex-grow ml-4">
            <div className="flex flex-col">
              <div className="font-medium">{item?.video?.title}</div>
              <div>ID: {item?.video?.id}</div>
            </div>
            <div>
              {createPriceDisplayValue(
                video?.price?.amount,
                video?.price?.currency,
                navigator.language,
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
