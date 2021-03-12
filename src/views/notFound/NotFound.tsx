import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import NotFoundSVG from 'src/resources/icons/not-found.svg';
import Button from '@boclips-ui/button';
import { Layout } from 'src/components/layout/Layout';
import { Hero } from 'src/components/hero/Hero';

const NotFound = () => {
  return (
    <Layout rowsSetup="grid-rows-home">
      <Navbar showSearchBar />
      <Hero
        icon={<NotFoundSVG />}
        title="Page not found!"
        description="We can’t seem to find the page you’re looking for. Try going back to
          the previous page or contact support@boclips.com"
        actions={
          <Button
            onClick={() => {
              window.location.href = 'mailto:support@boclips.com';
            }}
            text="Contact Support"
          />
        }
      />
      <Footer />
    </Layout>
  );
};

export default NotFound;
