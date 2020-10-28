import React from 'react';
import Navbar from 'src/components/Navbar';
import SearchContainer from 'src/components/SearchContainer';
import Footer from 'src/components/Footer';

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <SearchContainer />
        <Footer />
      </div>
    </div>
  );
};

export default HomeView;
