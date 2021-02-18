import React, { useEffect } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import CloseIconSVG from 'src/resources/icons/cross-icon.svg';
import { handleEnterKeyDown } from 'src/services/handleEnterKeyDown';
import Button from '@boclips-ui/button';
import c from 'classnames';
import { CartItemOrderPreview } from 'src/components/cart/CartItemOrderPreview/CartItemOrderPreview';
import { usePlaceOrderQuery } from 'src/hooks/api/orderQuery';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { useHistory } from 'react-router-dom';
import { getTotalPriceDisplayValue } from 'src/services/getTotalPriceDisplayValue';
import { AnalyticsTrackClick } from 'src/components/common/analytics/AnalyticsTrackClick';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import s from './style.module.less';

export interface Props {
  setOpen: (boolean) => void;
  modalOpen: boolean;
  videos: Video[];
}

export const OrderModal = ({ setOpen, modalOpen, videos }: Props) => {
  const history = useHistory();

  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  const { data: cart } = useCartQuery();

  const {
    mutate: placeOrder,
    data: orderLocation,
    isSuccess,
    error,
    isLoading,
  } = usePlaceOrderQuery();

  const onClick = () => {
    placeOrder({ cart, user });
  };

  useEffect(() => {
    if (isSuccess) {
      history.push({ pathname: '/order-confirmed' }, { orderLocation });
    }
  }, [history, isSuccess, orderLocation]);

  useEffect(() => {
    if (error) {
      history.push({ pathname: '/error' }, { error });
    }
  }, [history, error, orderLocation]);

  if (modalOpen) {
    return (
      <div
        className={c(s.modalWrapper, { [s.showModal]: modalOpen })}
        data-qa="order-modal"
      >
        <div className={s.modal}>
          <div className={s.modalContent}>
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
                <CloseIconSVG className="stroke-current  stroke-2" />
              </span>
            </div>
            <span className="text-base">
              Please confirm you want to place the following order:
            </span>
            <div className={s.modalItemsList}>
              <CartItemOrderPreview videos={videos} />
            </div>
          </div>
          <div className={s.modalFooter}>
            <div className={s.modalTotalPrice}>
              <span>Total</span>
              {`${getTotalPriceDisplayValue(videos)}`}
            </div>
            <div className={s.buttons}>
              <Button
                onClick={() => setOpen(!modalOpen)}
                type="outline"
                text="Go back to cart"
                height="44px"
              />
              <AnalyticsTrackClick eventType={AppcuesEvent.ORDER_CONFIRMED}>
                <Button
                  onClick={onClick}
                  height="44px"
                  text="Confirm order"
                  disabled={isUserLoading || !user || isLoading}
                />
              </AnalyticsTrackClick>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
