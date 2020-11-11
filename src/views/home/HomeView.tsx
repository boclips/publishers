import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import SearchHero from 'src/components/SearchHero/SearchHero';
import Footer from 'src/components/layout/Footer';

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
