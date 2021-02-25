import React from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from './components/common/Loading';
import Footer from './components/layout/Footer';
import { NakedNavbar } from './components/layout/Navbar';

const RefreshPageError = React.lazy(
  () => import('./components/common/errors/refreshPageError/RefreshPageError'),
);

export const FallbackApp = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <div className="grid grid-rows-search-view grid-cols-container gap-8">
        <Helmet title="Boclips" />
        <NakedNavbar />
        <RefreshPageError />
        <Footer />
      </div>
    </React.Suspense>
  );
};
