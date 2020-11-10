import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  navBar?: React.ReactElement;
}

export const PageLayout = ({
  navBar,
  children,
}: React.PropsWithChildren<Props>) => (
  <main>
    {navBar || <Navbar showSearchBar={false} />}
    <div className="container mx-auto">{children}</div>
    <Footer />
  </main>
);
