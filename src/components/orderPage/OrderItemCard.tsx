import { OrderItem } from 'boclips-api-client/dist/sub-clients/orders/model/OrderItem';
import React from 'react';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { AdditionalServicesSummaryPreview } from 'src/components/cart/AdditionalServices/AdditionalServicesSummaryPreview';
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
      className="flex flex-row border-b-2 border-blue-300 first:pt-0 py-4"
      style={{ minHeight: '156px' }}
    >
      <div
        data-qa="order-item-thumbnail"
        className={s.thumbnail}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      />
      <div className="flex flex-col w-full relative pl-8">
        <span className="text-base absolute right-0">
          {createPriceDisplayValue(
            item?.price?.value,
            item?.price?.currency,
            navigator.language,
          )}
        </span>

        <div className="flex flex-col">
          <span className="font-medium text-base">{item.video.title}</span>
          <span>ID: {item.video.id} </span>
        </div>

        <AdditionalServicesSummaryPreview
          captionsRequested={item.captionsRequested}
          transcriptRequested={item.transcriptRequested}
          trim={item.trim}
          editRequest={item.editRequest}
          displayPrice
        />
      </div>
    </div>
  );
};
