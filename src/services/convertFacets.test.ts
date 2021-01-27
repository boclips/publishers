import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { SearchFilters } from 'src/hooks/useLocationParams';
import { convertFacets } from 'src/services/convertFacets';

describe('convertFacets', () => {
  it('can convert every facet type to a filter option', () => {
    const facets = FacetsFactory.sample({
      subjects: [FacetFactory.sample({ id: '1' })],
      durations: [FacetFactory.sample({ id: '2' })],
      videoTypes: [FacetFactory.sample({ id: '3' })],
      channels: [FacetFactory.sample({ id: '4' })],
    });

    const searchFilters: SearchFilters = {
      video_type: [],
      channel: [],
      subject: [],
      duration: [],
    };

    const filterOptions = convertFacets(facets, searchFilters);
    expect(filterOptions.channels[0].id).toEqual('4');
    expect(filterOptions.videoTypes[0].id).toEqual('3');
    expect(filterOptions.durations[0].id).toEqual('2');
    expect(filterOptions.subjects[0].id).toEqual('1');
  });

  it('can specify if a filter is selected', () => {
    const facets = FacetsFactory.sample({
      subjects: [
        FacetFactory.sample({ id: '1' }),
        FacetFactory.sample({ id: '2' }),
      ],
      durations: [FacetFactory.sample({ id: '1' })],
      videoTypes: [FacetFactory.sample({ id: '1' })],
      channels: [FacetFactory.sample({ id: '1' })],
    });

    const searchFilters: SearchFilters = {
      subject: ['2'],
      video_type: ['1'],
      channel: ['1'],
      duration: ['1'],
    };

    const filterOptions = convertFacets(facets, searchFilters);

    expect(filterOptions.subjects[0].isSelected).toEqual(false);
    expect(filterOptions.subjects[1].isSelected).toEqual(true);
    expect(filterOptions.videoTypes[0].isSelected).toEqual(true);
    expect(filterOptions.channels[0].isSelected).toEqual(true);
    expect(filterOptions.durations[0].isSelected).toEqual(true);
  });

  it(`returns empty lists when facets are null`, () => {
    const filterOptions = convertFacets(null, null);

    expect(filterOptions.subjects).toHaveLength(0);
    expect(filterOptions.videoTypes).toHaveLength(0);
    expect(filterOptions.channels).toHaveLength(0);
    expect(filterOptions.durations).toHaveLength(0);
  });

  it(`converts video type facet name to display name`, () => {
    const facets = FacetsFactory.sample({
      videoTypes: [
        FacetFactory.sample({ name: 'NEWS' }),
        FacetFactory.sample({ name: 'INSTRUCTIONAL' }),
        FacetFactory.sample({ name: 'STOCK' }),
      ],
    });

    const filterOptions = convertFacets(facets, null);
    expect(filterOptions.videoTypes[0].name).toEqual('News');
    expect(filterOptions.videoTypes[1].name).toEqual('Educational');
    expect(filterOptions.videoTypes[2].name).toEqual('Raw Footage');
  });

  it(`converts duration facet name to display name`, () => {
    const facets = FacetsFactory.sample({
      durations: [
        FacetFactory.sample({ name: 'PT0S-PT1M' }),
        FacetFactory.sample({ name: 'PT1M-PT5M' }),
        FacetFactory.sample({ name: 'PT5M-PT10M' }),
        FacetFactory.sample({ name: 'PT10M-PT20M' }),
        FacetFactory.sample({ name: 'PT20M-PT24H' }),
      ],
    });

    const filterOptions = convertFacets(facets, null);
    expect(filterOptions.durations[0].name).toEqual('Up to 1 min');
    expect(filterOptions.durations[1].name).toEqual('1 - 5 min');
    expect(filterOptions.durations[2].name).toEqual('5 - 10 min');
    expect(filterOptions.durations[3].name).toEqual('10 - 20 min');
    expect(filterOptions.durations[4].name).toEqual('20 min +');
  });
});
