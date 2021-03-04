import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import React from 'react';
import { useCartQuery } from 'src/hooks/api/cartQuery';
import { Cart } from 'src/components/cart/Cart';
import { Loading } from 'src/components/common/Loading';
import { EmptyCart } from 'src/components/cart/EmptyCart';
import { useGetVideos } from 'src/hooks/api/videoQuery';
import { CartSummary } from 'src/components/cart/CartSummary';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';
import { ErrorBoundary } from 'src/components/common/errors/ErrorBoundary';
import { Layout } from 'src/components/layout/Layout';

const CartView = () => {
  const { data: cart, isLoading: isCartLoading } = useCartQuery();
  const videoIds = cart?.items?.map((it) => it.videoId);

  const {
    data: cartItemVideos,
    isLoading: isCartItemVideosLoading,
  } = useGetVideos(videoIds);

  const itemsInCart = cart?.items?.length > 0;

  if (isCartLoading || isCartItemVideosLoading || !videoIds) return <Loading />;

  return (
    <Layout rowsSetup="grid-rows-cart-view">
      <Navbar showSearchBar />
      {itemsInCart && videoIds ? (
        <>
          <CartSummary cart={cart} />
          <ErrorBoundary fallback={<RefreshPageError />}>
            <Cart cart={cart} cartItemVideos={cartItemVideos} />
          </ErrorBoundary>
        </>
      ) : (
        <EmptyCart />
      )}
      <Footer />
    </Layout>
  );
};

export default CartView;
