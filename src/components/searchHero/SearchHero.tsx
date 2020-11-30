import React from 'react';
import HomeImageSVG from 'src/resources/icons/home-search.svg';
import { Search } from 'src/components/searchBar/SearchBar';
import { prefetchSearchQuery } from 'src/hooks/api/useSearchQuery';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import c from 'classnames';
import s from './style.module.less';

const SearchHero = () => {
  return (
    <main className="col-start-2 col-end-26 row-start-2 row-end-2 bg-primary-light h-full rounded-lg">
      <section className={c(s.heroContainer, 'grid grid-cols-12  h-full')}>
        <div className="col-start-2 col-end-12 flex flex-row justify-self-center self-center items-center">
          <div className="flex flex-col pr-20">
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
          <div className={c(s.svgContainer, '')}>
            <HomeImageSVG />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchHero;
