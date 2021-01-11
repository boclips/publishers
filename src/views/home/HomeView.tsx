import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import SearchHero from '../../components/searchHero/SearchHero';

const HomeView = ({apiClient}) => {
  return (
    <div className="grid grid-rows-home grid-cols-container gap-8">
      <Navbar showSearchBar={false} />
      <SearchHero apiClient={apiClient} />
      <Footer />
    </div>
  );
};

export default HomeView;
