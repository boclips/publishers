import React from 'react';
import HomeImageSVG from 'src/resources/home-image.svg';

const SearchHero = () => {
  return (
    <main>
      <section className="grid bg-primary-light mt-10 grid-cols-12">
        <div className="col-span-7 justify-center items-center" />
        <div className="col-span-5">
          <HomeImageSVG />
        </div>
      </section>
    </main>
  );
};

export default SearchHero;
