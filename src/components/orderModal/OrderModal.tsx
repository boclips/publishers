import { CartItem } from 'src/components/cart/CartItem';
import React from 'react';
import Modal from 'react-modal';
import { Video } from 'boclips-api-client/dist/types';
import CloseIconSVG from 'src/resources/icons/cross-icon.svg';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';

export interface Props {
  setOpen: (boolean) => void;
  modalOpen: boolean;
  videos: Video[];
  placeOrder: () => void;
  confirmDisabled: boolean;
}

export const OrderModal = ({
  setOpen,
  modalOpen,
  videos,
  placeOrder,
  confirmDisabled,
}: Props) => {
  return (
    <Modal
      isOpen={modalOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          width: '75%',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      contentLabel="Order summary"
    >
      <div data-qa="order-modal">
        <div className="flex flex-row justify-between text-xl text-blue-900 font-medium w-full mb-3">
          Order summary
          <span
            onClick={(_) => setOpen(!modalOpen)}
            tabIndex={0}
            className="cursor-pointer m-3 text-grey-900"
            role="button"
            onKeyPress={(event) =>
              handleEnterKeyDown(event, setOpen(!modalOpen))
            }
          >
            <CloseIconSVG />
          </span>
        </div>
        Do you confirm you want to place the following order:
        <div className="overflow-y mt-3 ">
          {videos.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className="flex flex-row justify-end mt-3">
          <button
            onClick={(_) => setOpen(!modalOpen)}
            className="border-2 border-blue-500 rounded w-32 h-10 mr-2"
            type="button"
          >
            Go back to cart
          </button>
          <button
            onClick={(_) => {
              placeOrder();
              setOpen(!modalOpen);
            }}
            disabled={confirmDisabled}
            className="w-32 h-10 bg-blue-800 rounded text-white"
            type="button"
          >
            Confirm order
          </button>
        </div>
      </div>
    </Modal>
  );
};
