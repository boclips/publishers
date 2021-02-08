import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import React from 'react';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import s from './style.module.less';

interface Props {
  item: OrderItem;
}

export const OrderItemCard = ({ item }: Props) => {
  const { data: video, isLoading } = useFindOrGetVideo(item.video.id);

  const thumbnailUrl = isLoading
    ? ''
    : video.playback?.links?.thumbnail.getOriginalLink();

  return (
    <div
      className="flex flex-row py-6 border-b-2 border-blue-300"
      style={{ minHeight: '156px' }}
    >
      <div
        data-qa="order-item-thumbnail"
        className={s.thumbnail}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      />
      <div className="flex flex-col flex-grow pl-8">
        <span className="font-medium text-base">{item.video.title}</span>
        <span>ID: {item.video.id} </span>
      </div>
      <div className="flex flex-col flex-grow items-end">
        <span className="text-base">
          {createPriceDisplayValue(
            video?.price?.amount,
            video?.price?.currency,
            navigator.language,
          )}
        </span>
      </div>
    </div>
  );
};
