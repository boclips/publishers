import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import React from 'react';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';

interface Props {
  error: any;
}

const ErrorView = ({ error }: Props) => {
  console.error(error);

  return (
    <div className="grid grid-cols-container grid-rows-cart-view gap-8">
      <Navbar showSearchBar />
      <div className="col-start-2 col-end-26 row-start-2 row-end-4">
        <RefreshPageError />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorView;
