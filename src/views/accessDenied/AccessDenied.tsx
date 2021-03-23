import React from 'react';
import { NakedNavbar } from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { Layout } from 'src/components/layout/Layout';
import { PageNotFoundError } from 'src/components/common/errors/pageNotFound/PageNotFoundError';

const AccessDenied = () => {
  return (
    <Layout rowsSetup="grid-rows-home">
      <NakedNavbar />
      <PageNotFoundError />
      <Footer />
    </Layout>
  );
};

export default AccessDenied;
