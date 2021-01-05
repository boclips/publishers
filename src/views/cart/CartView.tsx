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
import { OrderConfirmed } from 'src/components/cart/OrderConfirmed';
import { useQueryCache } from 'react-query';
import { ErrorMessage } from 'src/components/common/ErrorMessage';

const CartView = () => {
  const { data: cart, isLoading: isCartLoading } = useCartQuery();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  const [orderLocation, setOrderLocation] = useState<string>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cache = useQueryCache();
  const [mutate] = usePlaceOrderQuery(
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
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 bg-primary-light h-auto rounded-lg">
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      );
    }

    if (orderLocation) {
      return <OrderConfirmed orderLocation={orderLocation} />;
    }

    if (itemsInCart && videos) {
      return (
        <>
          <div className="grid col-start-2 col-end-21 grid-row-start-2 grid-row-end-2 grid-cols-12 gap-8">
            <div className="col-start-1 col-end-21 flex flex-row">
              <h2 className="font-bold">Shopping cart</h2>
              <span className="text-3xl pl-3">
                ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})
              </span>
            </div>
          </div>
          <div className="col-start-2 col-end-20 pt-4 font-medium">
            <div className="pt-4 font-medium col-start-2 col-span-10">
              {videos.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
          </div>
          <div className="col-start-20 col-end-26 border-blue-500 border-2 h-32 w-full flex flex-col items-center rounded">
            <button
              onClick={(_) => setModalOpen(!modalOpen)}
              type="button"
              className="h-10 w-5/6 bg-blue-800 rounded text-white mt-12"
            >
              Place an order
            </button>
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
      <Navbar showSearchBar={false} />
      {cartToDisplay()}
      <Footer />
    </div>
  );
};

export default CartView;
