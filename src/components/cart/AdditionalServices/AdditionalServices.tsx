import React from 'react';
import { Video } from 'boclips-api-client/dist/types';

import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { TrimService } from 'src/components/cart/AdditionalServices/Trim/Trim';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
}

const AdditionalServices = ({ videoItem, cartItem }: Props) => {
  return (
    <div className="text-gray-700">
      <div className="text-base ">Additional services</div>
      <TrimService videoItem={videoItem} cartItem={cartItem} />
    </div>
  );
};

export default AdditionalServices;
