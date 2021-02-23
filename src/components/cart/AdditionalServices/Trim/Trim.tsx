import React, { useEffect, useState } from 'react';
import { useCartItemAdditionalServicesMutation } from 'src/hooks/api/cartQuery';
import { AdditionalServices as AdditionalServicesApi } from 'boclips-api-client/dist/sub-clients/carts/model/AdditionalServices';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import c from 'classnames';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
  price?: string;
}

const BASE_DURATION = '00:00';

export const TrimService = ({ videoItem, cartItem, price }: Props) => {
  const {
    mutate: mutateAdditionalServices,
  } = useCartItemAdditionalServicesMutation();

  const trimSet = !!cartItem?.additionalServices?.trim;
  const [trimChecked, setTrimChecked] = useState(trimSet);
  const [trimTouched, setTrimTouched] = useState(trimSet);
  const [isValid, setIsValid] = useState(true);

  const [trimValue, setTrimValue] = useState<AdditionalServicesApi>({
    trim: {
      from: cartItem.additionalServices?.trim?.from,
      to: cartItem.additionalServices?.trim?.to,
    },
  });

  const isInputValid = (timeInput: string) => {
    console.log(
      !trimTouched || (timeInput && !!timeInput?.match(/(^\d+:[0-5]\d$)/)),
    );
    return !trimTouched || (timeInput && !!timeInput?.match(/(^\d+:[0-5]\d$)/));
  };

  useEffect(() => {
    setIsValid(
      isInputValid(trimValue.trim.from) && isInputValid(trimValue.trim.to),
    );
  }, [trimValue, trimChecked, isInputValid]);

  const onChangeCheckbox = (e) => {
    setTrimChecked(e.currentTarget.checked);

    if (!e.currentTarget.checked) {
      mutateAdditionalServices({
        cartItem,
        additionalServices: { trim: null },
      });

      setTrimTouched(false);

      setTrimValue((prevState) => {
        return {
          ...prevState,
          trim: {
            from: null,
            to: null,
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
    mutateAdditionalServices({
      cartItem,
      additionalServices: {
        trim: trimValue.trim,
      },
    });
  };

  return (
    <div>
      <div className="flex">
        <label
          className="cursor-pointer font-normal mr-8"
          htmlFor={videoItem.id}
        >
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
      </div>
      {trimChecked && (
        <div className="ml-8">
          <div className="text-xs font-normal mt-1">
            Specify how you’d like to trim the video
          </div>
          <div className="text-md h-full flex flex-row font-normal mt-2">
            <label htmlFor={`${videoItem.id}-from`}>
              From:
              <input
                aria-label="trim-from"
                className={c(
                  'rounded outline-none w-16 h-10 ml-2 mr-6 px-2 text-center',
                  {
                    'border-blue-300 border': isValid,
                    'border-red-error border-1': !isValid,
                  },
                )}
                type="text"
                onFocus={() => setTrimTouched(true)}
                onBlur={onBlur}
                onChange={(e) => onChangeTrimInput(e, 'from')}
                placeholder={BASE_DURATION}
                id={`${videoItem.id}-from`}
                value={trimValue.trim.from}
              />
            </label>
            <label htmlFor={`${videoItem.id}-to`}>
              To:
              <input
                aria-label="trim-to"
                className={c(
                  'rounded outline-none w-16 h-full ml-2 mr-6 px-2 text-center',
                  {
                    'border-blue-300 border': isValid,
                    'border-red-error border-1': !isValid,
                  },
                )}
                type="text"
                placeholder={BASE_DURATION}
                onFocus={() => setTrimTouched(true)}
                onChange={(e) => onChangeTrimInput(e, 'to')}
                onBlur={onBlur}
                id={`${videoItem.id}-to`}
                value={trimValue.trim.to}
              />
            </label>
          </div>
          {!isValid && (
            <div className="font-normal text-xs ml-12 text-red-error">
              Specify your trimming options
            </div>
          )}
        </div>
      )}
    </div>
  );
};
