import React, { useState } from 'react';
import { useCartItemAdditionalServicesMutation } from 'src/hooks/api/cartQuery';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { InputWithDebounce } from 'src/components/cart/InputWithDebounce';
import c from 'classnames';

interface Props {
  label: string;
  cartItem: CartItem;
  price?: string;
}

export const EditRequest = ({ label, cartItem, price }: Props) => {
  const isChecked = !!cartItem?.additionalServices?.editRequest;
  const id = `${cartItem.videoId}editingRequested`;

  const {
    mutate: mutateAdditionalServices,
  } = useCartItemAdditionalServicesMutation();

  const [serviceRequested, setServiceRequested] = useState(isChecked);

  const handleChange = (e) => {
    if (!e.currentTarget.checked) {
      updateEditRequest(null);
    }
    setServiceRequested(e.currentTarget.checked);
  };

  const updateEditRequest = (editRequest: string | null) => {
    mutateAdditionalServices({
      cartItem,
      additionalServices: { editRequest },
    });
  };

  return (
    <>
      <div className={c('h-9 flex flex-col justify-center relative')}>
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
        <div className="ml-6">
          <div className="font-normal text-xs mb-3 ml-2">
            Specify how you&apos;d like to edit the video
          </div>
          <InputWithDebounce
            currentValue={cartItem.additionalServices?.editRequest}
            onUpdate={updateEditRequest}
            placeholder="eg. Remove front and end credits"
          />
        </div>
      )}
    </>
  );
};
