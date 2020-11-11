import React from 'react';
import SearchBar from '@boclips-ui/search-bar';
import { useHistory } from 'react-router-dom';

export const Search = () => {
  const history = useHistory();

  const handleSearch = (searchQuery: string) => {
    return history.push({ pathname: `/videos`, search: `?q=${searchQuery}` });
  };
  return (
    <SearchBar
      placeholder="Search by topic or keyword"
      size="big"
      autocomplete={false}
      onSearch={handleSearch}
      theme="publishers"
    />
  );
};
