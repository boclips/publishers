import React from 'react';
import HomeImageSVG from 'src/resources/icons/home-search.svg';
import { Search } from 'src/components/searchBar/SearchBar';
import { prefetchSearchQuery } from 'src/hooks/api/useSearchQuery';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import c from 'classnames';
import s from './style.module.less';

const SearchHero = ({apiClient}) => {
  return (
    <main className="h-full rounded-lg col-start-2 col-end-26 row-start-2 row-end-2 bg-primary-light">
      <section
        className={c(s.heroContainer, 'grid grid-cols-content gap-8  h-full')}
      >
        <div className="self-center col-start-3 col-end-15 lg:col-start-4 lg:col-end-16">
          <h1 className="mb-8 text-4xl font-medium">
            What videos do you need today?
          </h1>
          <Search
            size="big"
            showIconOnly={false}
            onSearch={(query) =>
              prefetchSearchQuery({ apiClient, query, page: 0, pageSize: PAGE_SIZE })
            }
          />
        </div>
        <div className="self-center col-start-16 col-end-24 justify-self-start">
          <div className={c(s.svgContainer)}>
            <HomeImageSVG />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchHero;
