import React from 'react';
import RefreshPageError from 'src/components/common/errors/refreshPageError/RefreshPageError';
import Footer from 'src/components/layout/Footer';
import { Layout } from 'src/components/layout/Layout';
import { EmptyNavbar } from 'src/components/layout/EmptyNavbar';

const FallbackView = () => (
  <Layout rowsSetup="grid-rows-search-view">
    <EmptyNavbar />
    <RefreshPageError />
    <Footer />
  </Layout>
);

export default FallbackView;
