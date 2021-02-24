import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { AdditionalServicesSummaryPreview } from 'src/components/cart/AdditionalServices/AdditionalServicesSummaryPreview';
import c from 'classnames';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import s from './style.module.less';

interface Props {
  videos: Video[];
}

export const CartItemOrderPreview = ({ videos }: Props) => {
  const { data: cart } = useCartQuery();

  const getAdditionalServicesSummary = (cartItem: CartItem) => {
    const trimLabel =
      cartItem?.additionalServices?.trim?.from &&
      cartItem?.additionalServices?.trim?.to
        ? `${cartItem.additionalServices.trim.from} - ${cartItem.additionalServices.trim.to}`
        : null;

    return (
      <AdditionalServicesSummaryPreview
        captionsRequested={cartItem?.additionalServices?.captionsRequested}
        transcriptRequested={cartItem?.additionalServices?.transcriptRequested}
        trim={trimLabel}
        editRequest={cartItem?.additionalServices?.editRequest}
        fontSize="text-xs"
        displayPrice
      />
    );
  };

  return (
    <div>
      {videos.map((video) => (
        <div
          key={video.id}
          className={c(
            s.orderSummaryWrapper,
            'flex flex-row py-3 border-b-2 border-blue-300 rounded',
          )}
        >
          <div className={s.imgWrapper}>
            <img
              src={video.playback.links.thumbnail.getOriginalLink()}
              alt={video.title}
            />
          </div>
          <div className="ml-5 w-full">
            <div className="text-sm text-gray-900 font-medium flex justify-between">
              <span>{video.title}</span>
              {video.price && (
                <span className="text-base font-normal">
                  {createPriceDisplayValue(
                    video.price.amount,
                    video.price.currency,
                    navigator.language,
                  )}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-800"> ID: {video.id}</div>
            {getAdditionalServicesSummary(
              cart?.items?.find((cartItem) => cartItem.videoId === video.id),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
