import React, { useState } from 'react';
import Button from '@boclips-ui/button';
import { getTotalPriceDisplayValue } from 'src/services/getTotalPriceDisplayValue';
import { Video } from 'boclips-api-client/dist/types';
import { Cart as ApiCart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';
import { OrderModal } from '../orderModal/OrderModal';

interface Props {
  videos: Video[];
  cart: ApiCart;
}

export const CartOrderSummary = ({ videos, cart }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const areCaptionsRequested = cart.items.find(it => it.additionalServices.captionsRequested);
  const isTranscriptRequested = cart.items.find(it => it.additionalServices.transcriptRequested);


  const renderCartSummaryItem = (label, value) => {
    return (
      <div className="flex justify-between my-3">
        <span>{label}</span>
        <span> {value}</span>
      </div>
    );
  };

  console.log(cart)
  console.log(videos)
  return (
    <>
      <div className="col-start-20 col-end-26">
        <div className="border-blue-500 h-72 border-2 flex flex-col rounded p-5">
          <div className="border-b border-blue-500 mb-4 font-normal text-base">
            {renderCartSummaryItem(
              <div>
                Vide<span className="tracking-tightestest">o(s)</span> total
              </div>,
              getTotalPriceDisplayValue(videos),
            )}
            {areCaptionsRequested && renderCartSummaryItem('Captions', 'Free')}
            {isTranscriptRequested && renderCartSummaryItem('Transcripts', 'Free')}
          </div>
          <div className="flex font-bold text-lg text-gray-900 justify-between mb-6">
            <span>Total</span>
            <span data-qa="total-price">{`${getTotalPriceDisplayValue(
              videos,
            )}`}</span>
          </div>
          <Button
            onClick={() => setModalOpen(!modalOpen)}
            text="Place order"
            height="44px"
            width="100%"
          />
        </div>
      </div>
      <OrderModal
        setOpen={setModalOpen}
        modalOpen={modalOpen}
        videos={videos}
      />
    </>
  );
};
