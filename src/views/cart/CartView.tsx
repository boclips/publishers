import React, { useState } from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import Navbar from 'src/components/layout/Navbar';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import { Loading } from 'src/components/common/Loading';
import Footer from 'src/components/layout/Footer';
import { EmptyCart } from 'src/components/cart/EmptyCart';
import CartItem from 'src/components/cart/CartItem';
import { OrderModal } from 'src/components/orderModal/OrderModal';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import { usePlaceOrderQuery } from 'src/hooks/api/orderQuery';
import { useQueryCache } from 'react-query';
import { ErrorMessage } from 'src/components/common/ErrorMessage';
import { useHistory } from 'react-router-dom';
import Button from '@boclips-ui/button';

const CartView = ({apiClient}) => {
  const history = useHistory();
  const { data: cart, isLoading: isCartLoading } = useCartQuery();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  const [orderLocation, setOrderLocation] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cache = useQueryCache();
  const [mutate] = usePlaceOrderQuery(
    apiClient,
    cache,
    setLoading,
    setOrderLocation,
    setErrorMessage,
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const itemsInCart = cart?.items?.length > 0;
  const videoIds = cart?.items?.map((it) => it.videoId);

  const { isLoading: areVideosLoading, data: videos } = useGetVideosQuery(
    videoIds,
  );

  const placeOrder = () => {
    mutate({ cart, user });
  };

  const cartToDisplay = () => {
    if (loading) {
      return (
        <div className="h-auto rounded-lg grid-cols-24 row-span-3 col-start-2 col-end-26">
          <Loading />
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="h-auto rounded-lg grid-cols-24 row-span-3 col-start-2 col-end-26 bg-primary-light">
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      );
    }

    if (orderLocation) {
      return history.push({ pathname: '/order-confirmed' }, { orderLocation });
    }

    if (itemsInCart && videos) {
      return (
        <>
          <div className="grid col-start-2 col-end-21 grid-row-start-2 grid-row-end-2 grid-cols-12 gap-8">
            <div className="flex flex-row col-start-1 col-end-21">
              <h2 className="font-bold">Shopping cart</h2>
              <span className="pl-3 text-3xl">
                ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})
              </span>
            </div>
          </div>
          <div className="pt-4 font-medium col-start-2 col-end-20">
            <div className="pt-4 font-medium col-start-2 col-span-10">
              {videos.map((item) => (
                <CartItem videoItem={item} key={item.id} />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end w-full h-32 p-5 border-2 border-blue-500 rounded col-start-20 col-end-26">
            <Button
              onClick={() => setModalOpen(!modalOpen)}
              type="primary"
              theme="publishers"
              text="Place an order"
              height="44px"
              width="100%"
            />
          </div>
          <OrderModal
            setOpen={setModalOpen}
            modalOpen={modalOpen}
            videos={videos}
            placeOrder={placeOrder}
            confirmDisabled={isUserLoading || !user}
          />
        </>
      );
    }
    return <EmptyCart />;
  };

  if (isCartLoading || areVideosLoading) {
    return (
      <div className="col-start-2 col-end-26">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar />
      {cartToDisplay()}
      <Footer />
    </div>
  );
};

export default CartView;
