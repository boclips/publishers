import React, { useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { InputWithDebounce } from 'src/components/cart/InputWithDebounce';
import c from 'classnames';

interface Props {
  label: string;
  cartItem: CartItem;
  price?: string;
}

export const EditRequest = ({ label, cartItem, price }: Props) => {
  const boclipsClient = useBoclipsClient();
  const isChecked = !!cartItem?.additionalServices?.editRequest;
  const id = `${cartItem.videoId}editingRequested`;

  const [serviceRequested, setServiceRequested] = useState(isChecked);

  const handleChange = (e) => {
    if (!e.currentTarget.checked) {
      updateEditRequest(null);
    }
    setServiceRequested(e.currentTarget.checked);
  };

  const updateEditRequest = (editRequest: string | null) => {
    doUpdateCartItem(
      cartItem,
      {
        editRequest,
      },
      boclipsClient,
    );
  };

  return (
    <>
      <div
        className={c('h-9 flex flex-col relative justify-center relative', {
          'mb-3': serviceRequested,
        })}
      >
        <label className="cursor-pointer font-normal mr-8" htmlFor={id}>
          <input
            onChange={handleChange}
            checked={serviceRequested}
            type="checkbox"
            id={id}
            className="form-checkbox checked:bg-blue-800 w-5 h-5 mr-2 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
          />
          <span
            className={c({
              'font-medium': serviceRequested,
            })}
          >
            {label}
          </span>
        </label>

        {price && (
          <div className="absolute top-0 right-0 flex h-full items-center text-lg font-normal">
            {price}
          </div>
        )}
      </div>
      {serviceRequested && (
        <InputWithDebounce
          currentValue={cartItem.additionalServices?.editRequest}
          onUpdate={updateEditRequest}
          placeholder="eg. Remove front and end credits"
        />
      )}
    </>
  );
};
