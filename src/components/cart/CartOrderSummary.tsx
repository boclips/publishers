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

  const renderAdditionalServicesSummary = (label) => {
      return (
          <div className="flex justify-between my-6">
              <div>
                  {label}
              </div>
              <div data-qa={"cart-summary-extra-services"}>Free</div>
          </div>
      )
  }
  return (
    <>
      <div className="col-start-20 col-end-26 border-blue-500 border-2 h-64 p-5 w-full justify-end flex flex-col rounded">
          <div className={"border-b border-blue-500 mb-6 font-normal text-base"}>
            <div className="flex justify-between">
              <div>
                Vide<span className="tracking-tightestest">o(s)</span> total
              </div>
              <div>{getTotalPriceDisplayValue(videos)}</div>
            </div>
              {renderAdditionalServicesSummary('Captions')}
              {renderAdditionalServicesSummary('Transcripts')}
          </div>
        <Button
          onClick={() => setModalOpen(!modalOpen)}
          text="Place an order"
          height="44px"
          width="100%"
        />
      </div>
      <OrderModal
        setOpen={setModalOpen}
        modalOpen={modalOpen}
        videos={videos}
      />
    </>
  );
};
