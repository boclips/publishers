import React from 'react';
import Navbar from 'src/components/Navbar';
import SearchHero from 'src/components/SearchHero';
import Footer from 'src/components/Footer';

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <SearchHero />
      <Footer />
    </div>
  );
};

export default HomeView;
