import React, { useState } from 'react';
import Button from '@boclips-ui/button';
import { Video } from 'boclips-api-client/dist/types';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import { OrderModal } from '../orderModal/OrderModal';

interface Props {
  videos: Video[];
  onPlaceOrder: (user) => void;
}

export const CartOrderSummary = ({ videos, onPlaceOrder }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  return (
    <>
      <div className="col-start-20 col-end-26 border-blue-500 border-2 h-32 p-5 w-full justify-end flex flex-col  rounded">
        <Button
          onClick={() => setModalOpen(!modalOpen)}
          type="primary"
          theme="publishers"
          text="Place an order"
          height="44px"
          width="100%"
        />
      </div>
      <OrderModal
        setOpen={setModalOpen}
        modalOpen={modalOpen}
        videos={videos}
        placeOrder={() => {
          onPlaceOrder(user);
        }}
        confirmDisabled={isUserLoading || !user}
      />
    </>
  );
};
