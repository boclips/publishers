import React from 'react';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';

interface Props {
  cartItem: CartItem;
}

export const OrderItemPreviewAdditionalServices = ({ cartItem }: Props) => {
  const trimmingService = () => (
    <div className="text-xs pt-1 text-gray-700">
      <div>
        Trimming:{' '}
        {`${cartItem.additionalServices.trim.from} -
          ${cartItem.additionalServices.trim.to}`}
      </div>
    </div>
  );

  const transcriptService = () => (
    <div className="text-xs pt-1 text-gray-700">
      <div>Requested transcripts</div>
    </div>
  );

  const captionsService = () => (
    <div className="text-xs pt-1 text-gray-700">
      <div>Captions: English</div>
    </div>
  );

  const additionalServices = [
    cartItem?.additionalServices?.trim ? trimmingService() : null,
    cartItem?.additionalServices?.transcriptRequested === true
      ? transcriptService()
      : null,
    cartItem?.additionalServices?.captionsRequested === true
      ? captionsService()
      : null,
  ].filter((service) => service != null);

  if (additionalServices.length > 0) {
    return (
      <>
        <div className="pt-2 font-medium text-xs"> Additional Services </div>,
        {additionalServices}
      </>
    );
  }
  return (
    <div className="text-xs font-medium pt-3 text-gray-700">
      No additional services selected
    </div>
  );
};
