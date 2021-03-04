import React from 'react';
import RefreshPageError from 'src/components/common/errors/refreshPageError/RefreshPageError';
import Footer from 'src/components/layout/Footer';
import { Layout } from 'src/components/layout/Layout';
import { NakedNavbar } from 'src/components/layout/Navbar';

const FallbackView = () => (
  <Layout rowsSetup="grid-rows-search-view">
    <NakedNavbar />
    <RefreshPageError />
    <Footer />
  </Layout>
);

export default FallbackView;
