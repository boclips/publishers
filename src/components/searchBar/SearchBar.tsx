import React from 'react';
import SearchBar from '@boclips-ui/search-bar';
import { useHistory } from 'react-router-dom';
import {
  convertToURLSearchParams,
  useLocationParams,
  useSearchQueryLocationParams,
} from 'src/hooks/useLocationParams';
import SearchIcon from '../../resources/icons/search-icon.svg';

interface Props {
  size: 'big' | 'small';
  showIconOnly: boolean;
  onSearch?: (query: string) => void;
}

export const Search = ({ size, showIconOnly, onSearch }: Props) => {
  const history = useHistory();
  const [searchLocation] = useSearchQueryLocationParams();
  const query = useLocationParams().get('q');

  const handleSearch = (searchQuery: string) => {
    if (onSearch) {
      onSearch(searchQuery);
    }

    searchLocation.query = searchQuery;

    const params = convertToURLSearchParams(searchLocation);

    return history.push({
      pathname: `/videos`,
      search: params.toString(),
    });
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
      buttonIcon={<SearchIcon />}
    />
  );
};
