import React from 'react';
import { PageLayout } from 'src/components/layout/PageLayout';
import SearchHero from '../../components/searchHero/SearchHero';

const HomeView = () => {
  return (
    <PageLayout>
      <SearchHero />
    </PageLayout>
  );
};

export default HomeView;
