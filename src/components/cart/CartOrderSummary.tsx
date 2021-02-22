import React, { ReactElement, useState } from 'react';
import Button from '@boclips-ui/button';
import { getTotalPriceDisplayValue } from 'src/services/getTotalPriceDisplayValue';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { OrderModal } from '../orderModal/OrderModal';

interface Props {
  videos: Video[];
}

interface CartSummaryItem {
  label: string | ReactElement;
  value: string | ReactElement;
}

export const additionalServicesLabels = new Map([
  ['transcriptRequested', 'Transcripts'],
  ['captionsRequested', 'Captions'],
  ['trim', 'Trimming'],
  ['editRequest', 'Editing'],
]);

const getSelectedAdditionalServices = (items: CartItem[]): String[] => {
  const additionalServiceValues = items.map((item) => {
    if (!item.additionalServices) return null;
    const keys = Object.keys(item.additionalServices);
    return keys.filter((key) => item.additionalServices[key]);
  });

  const flattenAndRemoveDuplicates = (array: string[][]): string[] => {
    const flattenedArray = [].concat(...array);
    const removeDuplicates = (services) =>
      services.filter((v, i) => services.indexOf(v) === i).sort();

    return removeDuplicates(flattenedArray);
  };

  return flattenAndRemoveDuplicates(additionalServiceValues);
};

export const CartOrderSummary = ({ videos }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: cart } = useCartQuery();

  const CartSummaryItem = ({ label, value }: CartSummaryItem) => {
    return (
      <div className="flex justify-between my-3">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <>
      <div className="col-start-20 col-end-26">
        <div className="border-blue-500 h-72 border-2 flex flex-col rounded p-5">
          <div className="border-b border-blue-500 mb-4 font-normal text-base">
            <CartSummaryItem
              label={
                <div>
                  Vide<span className="tracking-tightestest">o(s)</span> total
                </div>
              }
              value={getTotalPriceDisplayValue(videos)}
            />
            {getSelectedAdditionalServices(cart.items).map(
              (service: string) => {
                return (
                  <CartSummaryItem
                    key={`${service}-cart-summary`}
                    label={additionalServicesLabels.get(service)}
                    value="Free"
                  />
                );
              },
            )}
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
