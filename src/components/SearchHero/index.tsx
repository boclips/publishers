import React from 'react';
import SearchBar from '@boclips-ui/search-bar';
import HomeImageSVG from 'src/resources/home-image.svg';

const SearchHero = () => {
  return (
    <section className="grid grid-cols-12 bg-primary-light h-auto rounded-lg my-12">
      <div className="col-span-7 mt-32 ml-16 mr-10">
        <h1 className="mb-8 text-4xl font-medium">
          What video do you need today?
        </h1>
        <SearchBar
          placeholder="Search by topic or keyword"
          size="big"
          autocomplete={false}
          onSearch={() => null}
          theme="publishers"
        />
      </div>
      <div className="col-span-5 my-16 mx-6">
        <HomeImageSVG />
      </div>
    </section>
  );
};

export default SearchHero;
