import React from 'react';
import RefreshPageError from 'src/components/common/errors/refreshPageError/RefreshPageError';
import Footer from 'src/components/layout/Footer';
import { NakedNavbar } from 'src/components/layout/Navbar';

const FallbackView = () => (
  <div className="grid grid-rows-search-view grid-cols-container gap-8">
    <NakedNavbar />
    <RefreshPageError />
    <Footer />
  </div>
);

export default FallbackView;
