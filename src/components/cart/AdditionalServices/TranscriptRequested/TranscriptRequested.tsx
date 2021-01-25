import React, { useState } from 'react';
import { doUpdateCartItem } from 'src/hooks/api/cartQuery';
import { Video } from 'boclips-api-client/dist/types';
import { CartItem } from 'boclips-api-client/dist/sub-clients/carts/model/CartItem';
import c from 'classnames';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

interface Props {
  videoItem: Video;
  cartItem: CartItem;
}

const TranscriptRequested = ({ videoItem, cartItem }: Props) => {
  const boclipsClient = useBoclipsClient();

  const isChecked = cartItem?.additionalServices?.transcriptRequested;

  const [transcriptRequested, setTranscriptRequested] = useState<boolean>(
    isChecked,
  );

  const onChangeCheckbox = (e) => {
    setTranscriptRequested(e.currentTarget.checked);

    doUpdateCartItem(
      cartItem,
      {
        transcriptRequested: e.currentTarget.checked,
      },
      boclipsClient,
    );
  };

  return (
    <div className="h-9 flex flex-row items-center">
      <label
        className="cursor-pointer font-normal mr-8"
        htmlFor={`${videoItem.id}-transcript`}
      >
        <input
          onChange={onChangeCheckbox}
          id={`${videoItem.id}-transcript`}
          checked={transcriptRequested}
          type="checkbox"
          className="form-checkbox checked:bg-blue-800 w-5 h-5 mr-2 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
        />
        <span
          className={c({
            'font-medium': transcriptRequested,
          })}
        >
          Request transcripts
        </span>
      </label>
    </div>
  );
};

export default TranscriptRequested;
