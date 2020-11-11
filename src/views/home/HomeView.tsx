import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import SearchHero from '../../components/searchHero/SearchHero';

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <SearchHero />
      </main>
      <Footer />
    </div>
  );
};

export default HomeView;
