import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';

import Navbar from 'src/components/layout/Navbar';
import { useGetVideosQuery } from 'src/hooks/api/videoQuery';
import { Loading } from 'src/components/common/Loading';
import Footer from 'src/components/layout/Footer';
import { EmptyCart } from 'src/components/cart/EmptyCart';
import { CartItem } from 'src/components/cart/CartItem';

const CartView = () => {
  const { data: cart, isLoading: isCartLoading } = useCartQuery();

  const itemsInCart = cart?.items?.length > 0;
  const videoIds = cart?.items?.map((it) => it.videoId);

  const { isLoading: areVideosLoading, data: videos } = useGetVideosQuery(
    videoIds,
  );

  const cartToDisplay = () => {
    if (itemsInCart && videos) {
      return (
        <>
          <div className="grid col-start-2 col-end-21 grid-row-start-2 grid-row-end-2 grid-cols-12 gap-8">
            <div className="col-start-1 col-end-12 flex flex-row">
              <h2 className="font-bold">Shopping cart</h2>
              <span className="text-3xl pl-3">
                ({cart.items.length} item{cart.items.length > 1 ? 's' : ''})
              </span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 col-start-2 col-end-18 grid-row-start-3 border-t-2 border-blue-300 pt-4 font-medium">
            {videos.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
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
