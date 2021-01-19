import { mount } from 'cypress-react-unit-test';
import { SearchResultsSummary } from 'src/components/searchResults/SearchResultsSummary';

describe('TodoList', () => {
  it('renders the todo list', () => {
    mount(SearchResultsSummary({ count: 1, query: 'cats' }));
  });
});
