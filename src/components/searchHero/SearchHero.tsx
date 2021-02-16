import React from 'react';
import HomeImageSVG from 'src/resources/icons/home-search.svg';
import { Search } from 'src/components/searchBar/SearchBar';
import { prefetchSearchQuery } from 'src/hooks/api/useSearchQuery';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import c from 'classnames';
import { useQueryClient } from 'react-query';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import s from './style.module.less';
import { useBoclipsClient } from '../common/BoclipsClientProvider';

const SearchHero = () => {
  const queryClient = useQueryClient();
  const boclipsClient = useBoclipsClient();
  return (
    <main className="col-start-2 col-end-26 row-start-2 row-end-2 bg-primary-light h-full rounded-lg">
      <section
        className={c(s.heroContainer, 'grid grid-cols-content gap-8  h-full')}
      >
        <div className="col-start-3 col-end-15 self-center lg:col-start-4 lg:col-end-16">
          <h1 className="mb-8 text-4xl font-medium">
            What videos do you need today?
          </h1>
          <Search
            size="big"
            showIconOnly={false}
            onSearch={(query) => {
              prefetchSearchQuery(
                queryClient,
                {
                  query,
                  page: 0,
                  pageSize: PAGE_SIZE,
                },
                boclipsClient,
              );
              AnalyticsFactory.getAppcues().sendEvent(
                AppcuesEvent.HOMEPAGE_SEARCH,
                { query },
              );
            }}
          />
        </div>
        <div className="col-start-16 col-end-24 self-center justify-self-start">
          <div className={c(s.svgContainer)}>
            <HomeImageSVG />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchHero;
