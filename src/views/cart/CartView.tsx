import React, { useEffect, useState } from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import Navbar from 'src/components/layout/Navbar';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import { Loading } from 'src/components/common/Loading';
import Footer from 'src/components/layout/Footer';
import { EmptyCart } from 'src/components/cart/EmptyCart';
import { usePlaceOrderQuery } from 'src/hooks/api/orderQuery';
import { ErrorMessage } from 'src/components/common/ErrorMessage';
import { useHistory } from 'react-router-dom';
import { Cart } from 'src/components/cart/Cart';

const CartView = () => {
  const history = useHistory();
  const { data: cart, isLoading: isCartLoading } = useCartQuery();
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newOrderLocation, setNewOrderLocation] = useState<string>();

  const itemsInCart = cart?.items?.length > 0;
  const videoIds = cart?.items?.map((it) => it.videoId);

  const { isLoading: areVideosLoading, data: videos } = useGetVideosQuery(
    videoIds,
  );

  const [mutate] = usePlaceOrderQuery(
    setLoading,
    setNewOrderLocation,
    setErrorMessage,
  );

  const placeOrder = (user) => {
    mutate({ cart, user });
  };

  useEffect(() => {
    if (newOrderLocation) {
      history.push(
        { pathname: '/order-confirmed' },
        { orderLocation: newOrderLocation },
      );
    }
  }, [newOrderLocation, history]);

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

    if (itemsInCart && videos) {
      return <Cart cart={cart} videos={videos} onPlaceOrder={placeOrder} />;
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
