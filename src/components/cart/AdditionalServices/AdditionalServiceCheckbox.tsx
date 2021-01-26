import React, { useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import c from 'classnames';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { AdditionalServices } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';

interface Props {
  label: string;
  type: keyof Omit<AdditionalServices, 'trim'>;
  cartItem: CartItem;
}

const AdditionalServicesCheckbox = ({ label, type, cartItem }: Props) => {
  const boclipsClient = useBoclipsClient();
  const id = cartItem.videoId + type;
  const isChecked = Boolean(cartItem?.additionalServices?.[type]);

  const [serviceRequested, setServiceRequested] = useState<boolean>(isChecked);

  const onChangeCheckbox = (e) => {
    setServiceRequested(e.currentTarget.checked);

    doUpdateCartItem(
      cartItem,
      {
        [type]: e.currentTarget.checked,
      },
      boclipsClient,
    );
  };

  return (
    <div className="h-9 flex flex-row items-center">
      <label className="cursor-pointer font-normal mr-8" htmlFor={id}>
        <input
          onChange={onChangeCheckbox}
          id={id}
          checked={serviceRequested}
          type="checkbox"
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
    </div>
  );
};

export default AdditionalServicesCheckbox;
