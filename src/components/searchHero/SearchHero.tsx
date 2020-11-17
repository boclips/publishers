import React from 'react';
import HomeImageSVG from 'src/resources/home-search.svg';
import { Search } from 'src/components/searchBar/SearchBar';
import { prefetchSearchQuery } from 'src/hooks/api/useSearchQuery';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';

const SearchHero = () => {
  return (
    <section className="grid grid-cols-12 bg-primary-light h-auto rounded-lg my-12">
      <div className="col-span-7 mt-32 ml-16 mr-10">
        <h1 className="mb-8 text-4xl font-medium">
          What video do you need today?
        </h1>
        <Search
          size="big"
          showIconOnly={false}
          onSearch={(query) =>
            prefetchSearchQuery({ query, page: 0, pageSize: PAGE_SIZE })
          }
        />
      </div>
      <div className="col-span-5 my-16 mx-6 w-10/12 object-scale-down">
        <HomeImageSVG />
      </div>
    </section>
  );
};

export default SearchHero;
