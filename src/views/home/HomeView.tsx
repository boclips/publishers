import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import SearchHero from '../../components/searchHero/SearchHero';

const HomeView = () => {
  return (
    <div className="grid grid-rows-home grid-cols-container gap-6">
      <Navbar showSearchBar={false} />
      <SearchHero />
      <Footer />
    </div>
  );
};

export default HomeView;
