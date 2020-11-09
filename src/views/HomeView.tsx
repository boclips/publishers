import React from 'react';
import Navbar from 'src/components/Navbar';
import SearchHero from 'src/components/SearchHero';
import Footer from 'src/components/Footer';

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
