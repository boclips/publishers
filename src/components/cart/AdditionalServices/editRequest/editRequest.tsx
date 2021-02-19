import React, { useState } from 'react';
import { useCarItemAdditionalServicesMutation } from 'src/hooks/api/cartQuery';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { InputWithDebounce } from 'src/components/cart/InputWithDebounce';
import c from 'classnames';

interface Props {
  label: string;
  cartItem: CartItem;
}

export const EditRequest = ({ label, cartItem }: Props) => {
  const isChecked = !!cartItem?.additionalServices?.editRequest;
  const id = `${cartItem.videoId}editingRequested`;

  const {
    mutate: mutateAdditionalServices,
  } = useCarItemAdditionalServicesMutation();

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
      additionalServices: editRequest ? { editRequest } : { editRequest: null },
    });
  };

  return (
    <div className="mt-2 flex flex-row items-center">
      <label
        className="cursor-pointer flex flex-col font-normal mr-8 w-full"
        htmlFor={id}
      >
        <div className=" flex flex-row mb-3 text-sm">
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
        </div>
        {serviceRequested && (
          <InputWithDebounce
            currentValue={cartItem?.additionalServices?.editRequest}
            onUpdate={updateEditRequest}
            placeholder="eg. Remove front and end credits"
          />
        )}
      </label>
    </div>
  );
};
