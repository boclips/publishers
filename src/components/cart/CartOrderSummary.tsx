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

  return (
    <>
      <div className="col-start-20 col-end-26 border-blue-500 border-2 h-32 p-5 w-full justify-end flex flex-col rounded">
        <div className="flex justify-between mb-6 font-normal text-base">
          <div>
            Vide<span className="tracking-tightestest">o(s)</span> total
          </div>
          <div>{getTotalPriceDisplayValue(videos)}</div>
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
