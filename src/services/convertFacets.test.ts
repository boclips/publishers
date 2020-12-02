import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { convertFacets, searchFilterOptions } from 'src/services/convertFacets';
import { FilterOption } from 'src/types/FilterOption';
import { renderToStaticMarkup } from 'react-dom/server';

describe(`convertFacets`, () => {
  it(`converts facets to filters`, () => {
    const facets: Facet[] = [
      { id: 'hi', name: 'This is the name', hits: 10 },
      { id: 'bye', name: 'This is the name', hits: 10 },
    ];

    const options: FilterOption[] = convertFacets(facets);

    expect(options).toHaveLength(2);
    expect(options[0].id).toEqual(facets[0].id);
    expect(options[1].id).toEqual(facets[1].id);
    expect(options[0].hits).toEqual(facets[0].hits);
    expect(options[1].hits).toEqual(facets[1].hits);
    expect(renderToStaticMarkup(options[0].label)).toContain(
      `<span>${facets[0].name}</span>`,
    );
    expect(renderToStaticMarkup(options[1].label)).toContain(
      `<span>${facets[1].name}</span>`,
    );
  });

  it(`filters and bolds matching parts of facet name`, () => {
    const facets: Facet[] = [
      { id: 'hi', name: 'elephant', hits: 15 },
      { id: 'bye', name: 'elves', hits: 10 },
      { id: 'bye', name: 'eagles', hits: 5 },
    ];

    const options: FilterOption[] = searchFilterOptions(facets, 'el');

    expect(options).toHaveLength(2);

    expect(renderToStaticMarkup(options[0].label)).toEqual(
      '<span><b>el</b>ephant</span>',
    );
    expect(renderToStaticMarkup(options[1].label)).toEqual(
      '<span><b>el</b>ves</span>',
    );
  });

  it(`preserves case when bolding matching filters`, () => {
    const facets: Facet[] = [
      { id: 'hi', name: 'Elephant', hits: 15 },
      { id: 'bye', name: 'Elves', hits: 10 },
      { id: 'bye', name: 'eagles', hits: 5 },
    ];

    const options: FilterOption[] = searchFilterOptions(facets, 'el');

    expect(options).toHaveLength(2);

    expect(renderToStaticMarkup(options[0].label)).toEqual(
      '<span><b>El</b>ephant</span>',
    );
    expect(renderToStaticMarkup(options[1].label)).toEqual(
      '<span><b>El</b>ves</span>',
    );
  });
});
