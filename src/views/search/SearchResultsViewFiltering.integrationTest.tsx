import {
  ChannelFactory,
  FakeBoclipsClient,
} from 'boclips-api-client/dist/test-support';
import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';

import { MutationCache, QueryCache, QueryClient } from 'react-query';

const createReactQueryClient = () => {
  const mutationCache = new MutationCache();
  const queryCache = new QueryCache();
  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

describe(`SearchResultsFiltering`, () => {
  let fakeClient;

  function renderSearchResultsView(initialEntries: string[]) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <App
          reactQueryClient={createReactQueryClient()}
          apiClient={fakeClient}
        />
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    fakeClient = new FakeBoclipsClient();
  });

  it(`applies filters from url on load`, async () => {
    fakeClient.videos.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 1 }),
          FacetFactory.sample({ name: 'Stock', id: 'STOCK', hits: 1 }),
        ],
      }),
    );

    fakeClient.videos.insertVideo(
      VideoFactory.sample({
        id: '1',
        title: 'stock video',
        types: [{ name: 'STOCK', id: 1 }],
      }),
    );
    fakeClient.videos.insertVideo(
      VideoFactory.sample({
        id: '2',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      }),
    );

    const wrapper = renderSearchResultsView([
      '/videos?q=video&video_type=STOCK',
    ]);

    const stockCheckbox = await wrapper.findByTestId('STOCK-checkbox');
    expect(stockCheckbox).toHaveProperty('checked', true);
    expect(await wrapper.findByText('Selected filters')).toBeVisible();
  });

  describe(`video type filters`, () => {
    it(`displays the video type filters and facet counts`, async () => {
      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '1',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
        }),
      );

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          videoTypes: [
            FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 1234321 }),
            FacetFactory.sample({
              name: 'instructional',
              id: 'INSTRUCTIONAL',
              hits: 888,
            }),
            FacetFactory.sample({ name: 'stock', id: 'STOCK', hits: 666 }),
          ],
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Video type')).toBeInTheDocument();
      expect(await wrapper.findByText('Instructional')).toBeInTheDocument();
      expect(await wrapper.findByText('Raw Footage')).toBeInTheDocument();
      expect(await wrapper.findByText('News')).toBeInTheDocument();

      expect(await wrapper.findByText('888')).toBeInTheDocument();
      expect(await wrapper.findByText('666')).toBeInTheDocument();
      expect(await wrapper.findByText('1234321')).toBeInTheDocument();
    });

    it(`can filter videos by type`, async () => {
      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          videoTypes: [
            FacetFactory.sample({ id: 'STOCK', hits: 1, name: 'STOCK' }),
            FacetFactory.sample({ id: 'NEWS', hits: 1, name: 'NEWS' }),
          ],
        }),
      );
      const videos = [
        VideoFactory.sample({
          id: '1',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
        }),
        VideoFactory.sample({
          id: '2',
          title: 'news video',
          types: [{ name: 'NEWS', id: 2 }],
        }),
      ];

      videos.forEach((v) => fakeClient.videos.insertVideo(v));

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Video type')).toBeInTheDocument();

      expect(wrapper.queryByText('Instructional')).toBeNull();
      expect(await wrapper.findByText('News')).toBeInTheDocument();
      expect(await wrapper.findByText('Raw Footage')).toBeInTheDocument();

      await waitFor(async () => {
        expect(await wrapper.findByText('news video')).toBeInTheDocument();
        expect(await wrapper.findByText('stock video')).toBeInTheDocument();
      });

      const newsCheckbox = wrapper.getByTestId('NEWS-checkbox');

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          videoTypes: [
            FacetFactory.sample({ name: 'NEWS', id: 'NEWS', hits: 10 }),
          ],
        }),
      );

      fireEvent.click(wrapper.getByTestId('NEWS-checkbox'));
      expect(newsCheckbox).toHaveProperty('checked', true);

      await waitFor(() => {
        expect(wrapper.queryByText('Raw Footage')).toBeNull();
        expect(wrapper.queryByText('stock video')).toBeNull();
      });

      expect(await wrapper.findByLabelText(/News/)).toBeInTheDocument();
      expect(await wrapper.findByText('news video')).toBeInTheDocument();

      const selectedFiltersSection = wrapper.getByTestId('applied-filter-tags');

      expect(within(selectedFiltersSection).getByText('News')).toBeVisible();
    });
  });

  describe(`channel filters`, () => {
    it(`can filter channel filter options`, async () => {
      fakeClient.channels.insertFixture(
        ChannelFactory.sample({ id: 'getty-id', name: 'Getty' }),
      );
      fakeClient.channels.insertFixture(
        ChannelFactory.sample({ id: 'ted-id', name: 'Ted' }),
      );

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          channels: [
            FacetFactory.sample({ id: 'ted-id', hits: 1, name: 'Ted' }),
            FacetFactory.sample({ id: 'getty-id', hits: 1, name: 'Getty' }),
          ],
        }),
      );
      const videos = [
        VideoFactory.sample({
          id: '1',
          title: 'shark video',
          channelId: 'getty-id',
        }),
        VideoFactory.sample({
          id: '2',
          title: 'whale video',
          channelId: 'ted-id',
        }),
      ];

      videos.forEach((v) => fakeClient.videos.insertVideo(v));

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Channel')).toBeInTheDocument();

      expect(await wrapper.findByText('Getty')).toBeInTheDocument();
      expect(await wrapper.findByText('Ted')).toBeInTheDocument();

      act(() => {
        fireEvent.change(wrapper.getByPlaceholderText('Search for channel'), {
          target: { value: 'get' },
        });
      });
      expect(await wrapper.findByText('Get')).toHaveClass('font-medium');
      expect(wrapper.queryByText('Ted')).toBeNull();

      fireEvent.click(wrapper.getByTestId('getty-id-checkbox'));

      await waitFor(() => {
        expect(wrapper.queryByText('whale video')).toBeNull();
        expect(wrapper.queryByText('shark video')).toBeVisible();
      });
    });
  });

  describe('Subject filters', () => {
    it(`displays the subject filters and facet counts`, async () => {
      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          subjects: [{ id: 'subject1', name: 'History', hits: 12 }],
        }),
      );

      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '1',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Subject')).toBeInTheDocument();
      expect(await wrapper.findByText('History')).toBeInTheDocument();
      expect(await wrapper.findByText('12')).toBeInTheDocument();
    });
  });

  describe('Duration filters', () => {
    it(`displays the duration filters and facet counts`, async () => {
      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          durations: [
            { id: 'PT0S-PT1M', name: 'PT0S-PT1M', hits: 10 },
            { id: 'PT5M-PT10M', name: 'PT5M-PT10M', hits: 120 },
            { id: 'PT20M-PT24H', name: 'PT20M-PT24H', hits: 80 },
          ],
        }),
      );

      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '1',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Duration')).toBeInTheDocument();

      expect(await wrapper.findByText('80')).toBeInTheDocument();
      expect(await wrapper.findByText('120')).toBeInTheDocument();
      expect(await wrapper.findByText('10')).toBeInTheDocument();

      expect(await wrapper.findByText('Up to 1 min')).toBeInTheDocument();
      expect(await wrapper.findByText('5 - 10 min')).toBeInTheDocument();
      expect(await wrapper.findByText('20 min +')).toBeInTheDocument();
      expect(wrapper.queryByText('1 - 5 min')).not.toBeInTheDocument();
      expect(wrapper.queryByText('10 - 20 min')).not.toBeInTheDocument();
    });
  });

  describe(`price filters`, () => {
    it(`displays the price filters and facet counts when hits > 0`, async () => {
      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          prices: [
            { id: '10000', name: '10000', hits: 10 },
            { id: '20000', name: '20000', hits: 120 },
            { id: '30000', name: '30000', hits: 80 },
            { id: '50000', name: '50000', hits: 0 },
          ],
        }),
      );

      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '1',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Price')).toBeInTheDocument();
      expect(await wrapper.findByText('$100')).toBeInTheDocument();
      expect(wrapper.getByText('$200')).toBeInTheDocument();
      expect(wrapper.getByText('$300')).toBeInTheDocument();
      expect(wrapper.queryByText('$500')).not.toBeInTheDocument();
    });

    it(`can filter videos by price`, async () => {
      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          prices: [
            FacetFactory.sample({ id: '10000', hits: 1, name: '10000' }),
            FacetFactory.sample({ id: '20000', hits: 1, name: '20000' }),
          ],
        }),
      );
      const videos = [
        VideoFactory.sample({
          id: '1',
          title: 'cheap video',
          types: [{ name: 'STOCK', id: 1 }],
          price: { amount: 10000, currency: 'USD' },
        }),
        VideoFactory.sample({
          id: '2',
          title: 'expensive video',
          types: [{ name: 'NEWS', id: 2 }],
          price: { amount: 20000, currency: 'USD' },
        }),
      ];

      videos.forEach((v) => fakeClient.videos.insertVideo(v));

      const wrapper = renderSearchResultsView(['/videos?q=video']);

      expect(await wrapper.findByText('Price')).toBeInTheDocument();

      expect(await wrapper.findByText('$100')).toBeInTheDocument();
      expect(await wrapper.findByText('$200')).toBeInTheDocument();

      await waitFor(async () => {
        expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
        expect(await wrapper.findByText('expensive video')).toBeInTheDocument();
      });

      const hundredDollarCheckbox = wrapper.getByTestId('10000-checkbox');

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          prices: [
            FacetFactory.sample({ name: '10000', id: '10000', hits: 10 }),
          ],
        }),
      );

      fireEvent.click(wrapper.getByTestId('10000-checkbox'));
      expect(hundredDollarCheckbox).toHaveProperty('checked', true);

      expect(await wrapper.findByLabelText(/100/)).toBeInTheDocument();

      await waitFor(() => {
        expect(wrapper.getByText('cheap video')).toBeInTheDocument();
        expect(wrapper.queryByText('expensive video')).toBeNull();
      });
      const selectedFiltersSection = wrapper.getByTestId('applied-filter-tags');

      expect(within(selectedFiltersSection).getByText('$100')).toBeVisible();
    });
  });

  describe(`selected filters`, () => {
    beforeEach(() => {
      fakeClient = new FakeBoclipsClient();

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          prices: [
            FacetFactory.sample({ id: '10000', hits: 1, name: '10000' }),
            FacetFactory.sample({ id: '20000', hits: 1, name: '20000' }),
          ],
        }),
      );
      const videos = [
        VideoFactory.sample({
          id: '1',
          title: 'cheap video',
          types: [{ name: 'STOCK', id: 1 }],
          price: { amount: 10000, currency: 'USD' },
        }),
        VideoFactory.sample({
          id: '2',
          title: 'expensive video',
          types: [{ name: 'NEWS', id: 2 }],
          price: { amount: 20000, currency: 'USD' },
        }),
      ];

      videos.forEach((v) => fakeClient.videos.insertVideo(v));
    });

    it(`can remove filters individually from selected filter panel`, async () => {
      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '3',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
          price: {
            currency: 'USD',
            amount: 10000,
          },
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video&prices=10000']);

      expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
      expect(await wrapper.queryByText('expensive video')).toBeNull();

      const selectedFiltersSection = wrapper.getByTestId('applied-filter-tags');
      const appliedFilter = within(selectedFiltersSection).getByText('$100');

      fireEvent.click(within(appliedFilter).getByTestId('remove-filter'));

      await waitFor(() => {
        expect(wrapper.queryByText('Selected filters')).toBeNull();
      });

      expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
      expect(await wrapper.findByText('expensive video')).toBeInTheDocument();
    });

    it(`can remove all filters from selected filters panel`, async () => {
      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '3',
          title: 'stock video',
          types: [{ name: 'STOCK', id: 1 }],
          price: {
            currency: 'USD',
            amount: 10000,
          },
        }),
      );

      const wrapper = renderSearchResultsView(['/videos?q=video&prices=10000']);
      expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
      expect(await wrapper.queryByText('expensive video')).toBeNull();

      fireEvent.click(wrapper.getByText('Clear all'));

      await waitFor(() => {
        expect(wrapper.queryByText('Selected filters')).toBeNull();
      });

      expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
      expect(await wrapper.findByText('expensive video')).toBeInTheDocument();
    });
  });

  describe('no results', () => {
    it('shows a no results page without filters', async () => {
      const wrapper = renderSearchResultsView(['/videos?q=shark']);

      expect(
        await wrapper.findByText('We couldn’t find any videos for “shark”'),
      ).toBeVisible();
    });

    it('shows a no results page with filters', async () => {
      const video = VideoFactory.sample({
        id: '1',
        title: 'log',
        types: [{ name: 'STOCK', id: 1 }],
      });

      fakeClient.videos.insertVideo(video);

      const wrapper = renderSearchResultsView([
        '/videos?q=log&page=1&video_type=NEWS',
      ]);

      expect(
        await wrapper.findByText(
          'We couldn’t find any videos for “log” with your filter selection',
        ),
      ).toBeVisible();
    });
  });
});
