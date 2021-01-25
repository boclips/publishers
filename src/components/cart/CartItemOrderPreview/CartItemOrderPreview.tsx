import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { Video } from 'boclips-api-client/dist/types';
import s from './style.module.less';

interface Props {
  videos: Video[];
}

export const CartItemOrderPreview = ({ videos }: Props) => {
  const { data: cart } = useCartQuery();

  const renderAdditionalRequests = (cartItem: CartItem) => {
    const additionalRequests = [];

    const noRequests = (
      <div className="text-xs font-medium pt-3 text-gray-700">
        No additional services selected
      </div>
    );

    if (
      cartItem.additionalServices?.captionsRequested ||
      cartItem.additionalServices?.transcriptRequested ||
      cartItem.additionalServices?.trim
    ) {
      additionalRequests.push(
        <div className="pt-2 font-medium text-xs"> Additional Services </div>,
      );
    } else {
      return noRequests;
    }

    if (cartItem.additionalServices.trim) {
      const trim = (
        <div className="text-xs pt-1 text-gray-700">
          <div>
            Trimming:{' '}
            {`${cartItem.additionalServices.trim.from} -
          ${cartItem.additionalServices.trim.to}`}
          </div>
        </div>
      );

      additionalRequests.push(trim);
    }

    if (cartItem.additionalServices.transcriptRequested) {
      const transcriptRequested = (
        <div className="text-xs pt-1 text-gray-700">
          <div>Requested transcripts</div>
        </div>
      );

      additionalRequests.push(transcriptRequested);
    }

    if (cartItem.additionalServices.captionsRequested) {
      const transcriptRequested = (
        <div className="text-xs pt-1 text-gray-700">
          <div>Captions: English</div>
        </div>
      );

      additionalRequests.push(transcriptRequested);
    }

    return additionalRequests;
  };

  return (
    <div>
      {videos.map((it) => (
        <div
          key={it.id}
          className="flex flex-row py-3 border-b-2 border-blue-300 rounded"
        >
          <div className={s.imgWrapper}>
            <img
              src={it.playback.links.thumbnail.getOriginalLink()}
              alt={it.title}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-900 font-medium ">{it.title}</div>
            <div className="text-xs text-gray-700"> ID: {it.id}</div>
            {renderAdditionalRequests(
              cart?.items?.find((cartItem) => cartItem.videoId === it.id),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
