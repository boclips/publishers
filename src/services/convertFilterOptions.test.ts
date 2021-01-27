import { FilterOption } from 'src/types/FilterOption';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  convertFilterOptions,
  searchFilterOptions,
} from 'src/services/convertFilterOptions';

describe(`convertFilterOptions`, () => {
  it(`converts filterOptions to filterOptions with labels`, () => {
    const filterOptions: FilterOption[] = [
      { id: 'hi', name: 'This is the name', hits: 10, isSelected: false },
      { id: 'bye', name: 'This is the name', hits: 10, isSelected: false },
    ];

    const options = convertFilterOptions(filterOptions);

    expect(options).toHaveLength(2);
    expect(options[0].id).toEqual(filterOptions[0].id);
    expect(options[1].id).toEqual(filterOptions[1].id);
    expect(options[0].hits).toEqual(filterOptions[0].hits);
    expect(options[1].hits).toEqual(filterOptions[1].hits);
    expect(renderToStaticMarkup(options[0].label)).toContain(
      `<span>${filterOptions[0].name}</span>`,
    );
    expect(renderToStaticMarkup(options[1].label)).toContain(
      `<span>${filterOptions[1].name}</span>`,
    );
  });

  it(`filters and bolds matching parts of filter options name`, () => {
    const filterOptions: FilterOption[] = [
      { id: 'hi', name: 'elephant', hits: 15, isSelected: false },
      { id: 'bye', name: 'elves', hits: 10, isSelected: false },
      { id: 'bye', name: 'eagles', hits: 5, isSelected: false },
    ];

    const options = searchFilterOptions(filterOptions, 'el');

    expect(options).toHaveLength(2);

    expect(renderToStaticMarkup(options[0].label)).toEqual(
      '<span class="font-medium">el</span>ephant',
    );
    expect(renderToStaticMarkup(options[1].label)).toEqual(
      '<span class="font-medium">el</span>ves',
    );
  });

  it(`preserves case when bolding matching filters`, () => {
    const filterOptions: FilterOption[] = [
      { id: 'hi', name: 'Elephant', hits: 15, isSelected: false },
      { id: 'bye', name: 'Elves', hits: 10, isSelected: false },
      { id: 'bye', name: 'eagles', hits: 5, isSelected: false },
    ];

    const options = searchFilterOptions(filterOptions, 'el');

    expect(options).toHaveLength(2);

    expect(renderToStaticMarkup(options[0].label)).toEqual(
      '<span class="font-medium">El</span>ephant',
    );
    expect(renderToStaticMarkup(options[1].label)).toEqual(
      '<span class="font-medium">El</span>ves',
    );
  });
});
