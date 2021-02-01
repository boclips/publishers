import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import React from 'react';
import s from 'src/components/cart/style.module.less';
import { ErrorMessage } from 'src/components/common/ErrorMessage';

interface Props {
  error: any;
}

const ErrorView = ({ error }: Props) => {
  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar />
      <div className={s.orderConfirmedView} data-qa="order-confirmed">
        <ErrorMessage errorMessage={error.message} />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorView;
