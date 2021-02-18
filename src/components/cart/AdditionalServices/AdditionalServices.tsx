import React from 'react';
import { Video } from 'boclips-api-client/dist/types';

import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { TrimService } from 'src/components/cart/AdditionalServices/Trim/Trim';
import AdditionalServiceCheckbox from 'src/components/cart/AdditionalServices/AdditionalServiceCheckbox';
import { EditRequest } from 'src/components/cart/AdditionalServices/editRequest/editRequest';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
}

const AdditionalServices = ({ videoItem, cartItem }: Props) => {
  const addPrice = (service, price) => (
    <div className="flex flex-row justify-between">
      <span>{service}</span>
      <span className="h-9 flex items-center">{price}</span>
    </div>
  );

  return (
    <div className="text-gray-800">
      <div className="text-base">Additional services</div>
      {addPrice(
        <TrimService videoItem={videoItem} cartItem={cartItem} />,
        'Free',
      )}
      {addPrice(
        <AdditionalServiceCheckbox
          cartItem={cartItem}
          type="transcriptRequested"
          label="Request transcripts"
        />,
        'Free',
      )}
      {addPrice(
        <AdditionalServiceCheckbox
          cartItem={cartItem}
          type="captionsRequested"
          label="Request English captions"
        />,
        'Free',
      )}
      {addPrice(
        <EditRequest
          cartItem={cartItem}
          label="Request other type of editing"
        />,
        'Free',
      )}
    </div>
  );
};

export default AdditionalServices;
