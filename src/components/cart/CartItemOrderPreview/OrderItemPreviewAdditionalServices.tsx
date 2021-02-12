import React from 'react';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';

interface Props {
  cartItem: CartItem;
}

export const OrderItemPreviewAdditionalServices = ({ cartItem }: Props) => {
  const PricedService: React.FunctionComponent<{ price: string }> = ({
    children,
    price,
  }) => (
    <div className="flex flex-row justify-between">
      {children}
      <span className="flex items-center">{price}</span>
    </div>
  );

  const trimmingService = () => (
    <PricedService price="Free">
      <div className="text-xs pt-1 text-gray-700">
        <div>
          Trimming:{' '}
          {`${cartItem.additionalServices.trim.from} -
          ${cartItem.additionalServices.trim.to}`}
        </div>
      </div>
    </PricedService>
  );

  const transcriptService = () => (
    <PricedService price="Free">
      <div className="text-xs pt-1 text-gray-700">
        <div>Requested transcripts</div>
      </div>
    </PricedService>
  );

  const captionsService = () => (
    <PricedService price="Free">
      <div className="text-xs pt-1 text-gray-700">
        <div>Captions: English</div>
      </div>
    </PricedService>
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
        <div className="pt-2 font-medium text-xs"> Additional Services </div>
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
