import React, { useState } from 'react';
import Button from '@boclips-ui/button';
import { getTotalPriceDisplayValue } from 'src/services/getTotalPriceDisplayValue';
import { Video } from 'boclips-api-client/dist/types';
import { OrderModal } from '../orderModal/OrderModal';

interface Props {
  videos: Video[];
}

export const CartOrderSummary = ({ videos }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const renderCartSummaryItem = (label, value) => {
      return (
          <div className="flex justify-between my-3">
             <span>{label}</span>
             <span> {value}</span>
          </div>
      )
  }

  return (
    <div className={"col-start-20 col-end-26"}>
      <div className="border-blue-500 h-72 border-2 flex flex-col rounded p-5">
          <div className={"border-b border-blue-500 mb-4 font-normal text-base"}>
              {renderCartSummaryItem(<div>Vide<span className="tracking-tightestest">o(s)</span> total</div>
                  ,getTotalPriceDisplayValue(videos)
              )}
              {renderCartSummaryItem('Captions', "Free")}
              {renderCartSummaryItem('Transcripts',"Free")}
          </div>
          <div className={"flex font-bold text-lg text-gray-900 justify-between mb-6"}>
              <span>Total</span>
              <span data-qa={"total-price"}>{`${getTotalPriceDisplayValue(videos)}`}</span>
          </div>
        <Button
          onClick={() => setModalOpen(!modalOpen)}
          text="Place order"
          height="44px"
          width="100%"
        />
      </div>
      <OrderModal
        setOpen={setModalOpen}
        modalOpen={modalOpen}
        videos={videos}
      />
    </div>
  );
};
