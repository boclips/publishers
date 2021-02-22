import React, { useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { AdditionalServices as AdditionalServicesApi } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import TimeField from 'react-simple-timefield';
import c from 'classnames';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
  price?: string;
}

const BASE_FROM_DURATION = '00:00';

export const TrimService = ({ videoItem, cartItem, price }: Props) => {
  const boclipsClient = useBoclipsClient();

  const trimSet = !!cartItem?.additionalServices?.trim;
  const [trimChecked, setTrimChecked] = useState(trimSet);

  const safeToDuration = () => {
    const duration = videoItem.playback.duration;

    if (duration.seconds() && duration.minutes()) {
      return duration.format('mm:ss');
    }

    if (duration.seconds() && !duration.minutes()) {
      return duration.format('00:ss');
    }

    return duration.format('mm');
  };

  const [trimValue, setTrimValue] = useState<AdditionalServicesApi>({
    trim: {
      from: cartItem.additionalServices?.trim?.from || BASE_FROM_DURATION,
      to: cartItem.additionalServices?.trim?.to || safeToDuration(),
    },
  });

  const onChangeCheckbox = (e) => {
    setTrimChecked(e.currentTarget.checked);

    if (!e.currentTarget.checked) {
      doUpdateCartItem(cartItem, { trim: null }, boclipsClient);

      setTrimValue((prevState) => {
        return {
          ...prevState,
          trim: {
            from: BASE_FROM_DURATION,
            to: safeToDuration(),
          },
        };
      });
    }
  };

  const onChangeTrimInput = (e, trimCheckpoint) => {
    const trim = e.target.value;

    const value = { [trimCheckpoint]: trim };
    setTrimValue((prevState) => {
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
    doUpdateCartItem(cartItem, trimValue, boclipsClient);
  };

  return (
    <div className="h-9 flex flex-row items-center relative">
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
      {price && (
        <div className="absolute top-0 right-0 flex h-full items-center text-lg font-normal">
          {price}
        </div>
      )}
      {trimChecked && (
        <div className="h-full flex items-center font-normal">
          From:
          <TimeField
            onChange={(e) => onChangeTrimInput(e, 'from')}
            value={trimValue.trim.from}
            colon=":"
            input={
              <input
                aria-label="trim-from"
                className="border-blue-300 border rounded outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
                type="text"
                onBlur={onBlur}
              />
            }
          />
          To:
          <TimeField
            onChange={(e) => onChangeTrimInput(e, 'to')}
            value={trimValue.trim.to}
            colon=":"
            input={
              <input
                aria-label="trim-to"
                className="border-blue-300 border rounded outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
                type="text"
                onBlur={onBlur}
              />
            }
          />
        </div>
      )}
    </div>
  );
};
