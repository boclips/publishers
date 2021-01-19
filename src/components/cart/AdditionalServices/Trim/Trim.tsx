import React, { useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { AdditionalServices as AdditionalServicesApi } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import c from 'classnames';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
}

export const TrimService = ({ videoItem, cartItem }: Props) => {
  const hasTrim =
    cartItem.additionalServices === null
      ? false
      : cartItem.additionalServices.trim !== null;

  const [trimChecked, setTrimChecked] = useState(hasTrim);
  const [additionalServices, setAdditionalServices] = useState<
    AdditionalServicesApi
  >({
    trim: {
      from: cartItem.additionalServices?.trim?.from || '0:00',
      to:
        cartItem.additionalServices?.trim?.to ||
        videoItem.playback.duration.format('mm:ss'),
    },
  });

  const onChangeCheckbox = (e) => {
    setTrimChecked(e.currentTarget.checked);
    if (!e.currentTarget.checked) {
      doUpdateCartItem(cartItem, { trim: null });
      setAdditionalServices((prevState) => {
        return {
          ...prevState,
          trim: {
            from: '0:00',
            to: videoItem.playback.duration.format('mm:ss'),
          },
        };
      });
    }
  };

  const onChangeTrimInput = (e, trimValue) => {
    const value = { [trimValue]: e.currentTarget.value };
    setAdditionalServices((prevState) => {
      return {
        ...prevState,
        trim: {
          ...prevState.trim,
          ...value,
        },
      };
    });
  };

  const onBlur = () => {
    doUpdateCartItem(cartItem, additionalServices);
  };

  return (
    <div className="h-9 flex flex-row items-center">
      <label className="cursor-pointer font-normal mr-8" htmlFor={videoItem.id}>
        <input
          onChange={onChangeCheckbox}
          id={videoItem.id}
          checked={trimChecked}
          type="checkbox"
          className="form-checkbox checked:bg-blue-800 w-5 h-5 mr-2 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
        />
        <span
          className={c({
            'font-medium': trimChecked,
          })}
        >
          Trim video
        </span>
      </label>
      {trimChecked && (
        <div className="h-full flex items-center font-normal">
          From:
          <input
            aria-label="trim-from"
            onChange={(e) => onChangeTrimInput(e, 'from')}
            className="border-blue-300 border outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
            type="text"
            onBlur={onBlur}
            value={additionalServices.trim.from}
          />
          To:
          <input
            aria-label="trim-to"
            onChange={(e) => onChangeTrimInput(e, 'to')}
            className="border-blue-300 border outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
            type="text"
            onBlur={onBlur}
            value={additionalServices.trim.to}
          />
        </div>
      )}
    </div>
  );
};
