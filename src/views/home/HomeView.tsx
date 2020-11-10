import React from 'react';
import SearchHero from 'src/components/searchHero/SearchHero';
import { PageLayout } from 'src/components/layout/PageLayout';

const HomeView = () => {
  return (
    <PageLayout>
      <SearchHero />
    </PageLayout>
  );
};

export default HomeView;
