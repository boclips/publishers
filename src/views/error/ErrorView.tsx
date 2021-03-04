import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import React from 'react';
import { RefreshPageError } from 'src/components/common/errors/refreshPageError/RefreshPageError';
import { Layout } from 'src/components/layout/Layout';

interface Props {
  error: any;
}

const ErrorView = ({ error }: Props) => {
  console.error(error);

  return (
    <Layout rowsSetup="grid-rows-cart-view">
      <Navbar showSearchBar />
      <div className="col-start-1 col-end-25 row-start-2 row-end-2">
        <RefreshPageError />
      </div>
      <Footer />
    </Layout>
  );
};

export default ErrorView;
