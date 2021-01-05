import CartItem from 'src/components/cart/CartItem';
import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import CloseIconSVG from 'src/resources/icons/cross-icon.svg';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';
import Button from '@boclips-ui/button';
import c from 'classnames';
import s from './style.module.less';

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
  if (modalOpen) {
    return (
      <div
        className={c(s.modalWrapper, { [s.showModal]: modalOpen })}
        data-qa="order-modal"
      >
        <div className={s.modal}>
          <div className={s.modalHeader}>
            Order summary
            <span
              onClick={() => setOpen(!modalOpen)}
              tabIndex={0}
              className="cursor-pointer text-grey-900"
              role="button"
              onKeyPress={(event) =>
                handleEnterKeyDown(event, setOpen(!modalOpen))
              }
            >
              <CloseIconSVG />
            </span>
          </div>
          Do you confirm you want to place the following order:
          <div className={s.modalBody}>
            {videos.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
          <div className={s.buttons}>
            <Button
              onClick={() => setOpen(!modalOpen)}
              theme="publishers"
              type="secondary"
              text="Go back to cart"
            />
            <Button
              onClick={() => {
                placeOrder();
                setOpen(!modalOpen);
              }}
              theme="publishers"
              type="primary"
              text="Confirm order"
              disabled={confirmDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};
