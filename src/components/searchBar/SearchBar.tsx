import React from 'react';
import SearchBar from '@boclips-ui/search-bar';
import { useHistory } from 'react-router-dom';
import { useLocationParams } from 'src/hooks/useLocationParams';

interface Props {
  size: 'big' | 'small';
  showIconOnly: boolean;
}

export const Search = ({ size, showIconOnly }: Props) => {
  const history = useHistory();

  const query = useLocationParams().get('q');

  const handleSearch = (searchQuery: string) => {
    return history.push({ pathname: `/videos`, search: `?q=${searchQuery}` });
  };
  return (
    <SearchBar
      placeholder="Search by topic or keyword"
      size={size}
      onlySearchIconInButton={showIconOnly}
      autocomplete={false}
      onSearch={handleSearch}
      theme="publishers"
      initialQuery={query}
    />
  );
};