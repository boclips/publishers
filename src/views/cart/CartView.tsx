import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import { Cart } from 'src/components/cart/Cart';
import { Loading } from 'src/components/common/Loading';
import { EmptyCart } from 'src/components/cart/EmptyCart';

const CartView = () => {
  const { data: cart, isLoading: isCartLoading } = useCartQuery();
  const videoIds = cart?.items?.map((it) => it.videoId);

  const { data: videos, isLoading: areVideosLoading } = useGetVideosQuery(
    videoIds,
  );

  const itemsInCart = cart?.items?.length > 0;

  const cartToDisplay = () => {
    if (itemsInCart && videos) {
      return <Cart cart={cart} videoIds={videoIds} />;
    }

    if (areVideosLoading || isCartLoading) {
      return (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      );
    }

    return <EmptyCart />;
  };

  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar />
      {cartToDisplay()}
      <Footer />
    </div>
  );
};

export default CartView;
