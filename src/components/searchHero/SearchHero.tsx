import React from 'react';
import HomeImageSVG from 'src/resources/home-search.svg';
import { Search } from 'src/components/searchBar/SearchBar';
import { prefetchSearchQuery } from 'src/hooks/api/useSearchQuery';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import s from './style.module.less';

const SearchHero = () => {
  return (
    <section className={s.heroContainer}>
      <div className="col-start-2 col-end-8 self-center">
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
      <div className={s.svgContainer}>
        <HomeImageSVG />
      </div>
    </section>
  );
};

export default SearchHero;
