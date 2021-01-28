import React, { useEffect, useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import { InputWithDebounce } from 'src/components/cart/InputWithDebounce';

interface Props {
  label: string;
  cartItem: CartItem;
}

export const EditRequest = ({ label, cartItem }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const boclipsClient = useBoclipsClient();

  useEffect(() => {
    if (cartItem?.additionalServices?.editRequest) {
      setIsChecked(true);
    }
  }, [cartItem]);

  const handleChange = () => {
    if (isChecked) {
      updateEditRequest(null);
    }
    setIsChecked(!isChecked);
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
    <div className="mt-2 flex flex-row items-center">
      <label
        className="cursor-pointer flex flex-col font-normal mr-8 w-full"
        htmlFor={`${cartItem.videoId}editingRequested`}
      >
        <div className=" flex flex-row mb-3 text-sm">
          <input
            onChange={() => handleChange()}
            checked={isChecked}
            type="checkbox"
            id={`${cartItem.videoId}editingRequested`}
            className="form-checkbox checked:bg-blue-800 w-5 h-5 mr-2 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
          />
          <span className={`${isChecked && 'font-medium'}`}>{label}</span>
        </div>
        {isChecked && (
          <InputWithDebounce
            currentValue={cartItem.additionalServices?.editRequest || undefined}
            onUpdate={updateEditRequest}
            placeholder="eg. Remove front and end credits"
          />
        )}
      </label>
    </div>
  );
};
