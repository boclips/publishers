import { getFacetSorter } from 'src/services/sortFacets';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';

describe('Sort facets', () => {
  const testData: Facet[] = [
    {
      hits: 1,
      id: 'id-1',
      name: 'Zoo',
    },
    {
      hits: 1,
      id: 'id-2',
      name: 'Ark',
    },
    {
      hits: 2,
      id: 'id-3',
      name: 'Boat',
    },
  ];
  it('Sorts facets by hits and then name', () => {
    const sortedData = testData.sort(getFacetSorter('SORT_BY_HITS_AND_NAME'));
    expect(sortedData[0].id).toEqual('id-3');
    expect(sortedData[1].id).toEqual('id-2');
    expect(sortedData[2].id).toEqual('id-1');
  });

  it('Sorts facets by name', () => {
    const sortedData = testData.sort(getFacetSorter('SORT_BY_NAME'));
    expect(sortedData[0].id).toEqual('id-2');
    expect(sortedData[1].id).toEqual('id-3');
    expect(sortedData[2].id).toEqual('id-1');
  });
});
