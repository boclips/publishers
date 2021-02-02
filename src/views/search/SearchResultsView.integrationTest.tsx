import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import App from 'src/App';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import Navbar from 'src/components/layout/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { queryClientConfig } from 'src/hooks/api/queryClientConfig';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { BoclipsClientProvider } from 'src/components/common/BoclipsClientProvider';

describe('SearchResults', () => {
  it('renders a list of videos that match the search query', async () => {
    const fakeClient = new FakeBoclipsClient();
    const videos = [
      VideoFactory.sample({ id: '1', title: '1' }),
      VideoFactory.sample({
        title: 'hello i am a title',
        description: 'wow what a video hansen',
        ageRange: {
          min: 7,
          max: 9,
        },
        releasedOn: new Date('2019-03-20'),
        createdBy: 'BFI',
        subjects: [
          {
            id: '123',
            name: 'geography',
          },
        ],
        playback: PlaybackFactory.sample({
          type: 'YOUTUBE',
        }),
      }),
    ];

    videos.forEach((v) => fakeClient.videos.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=hello']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('hello i am a title')).toBeVisible();
    expect(await wrapper.findByText('wow what a video hansen')).toBeVisible();
    expect(await wrapper.findByText('Released on Mar 20, 2019')).toBeVisible();
    expect(await wrapper.findByText('by BFI')).toBeVisible();
    expect(await wrapper.findByText('geography')).toBeVisible();
    expect(await wrapper.findByText('Ages 7-9')).toBeVisible();
    expect(wrapper.queryByText('Selected filters')).not.toBeInTheDocument();
  });

  it('renders a hits count that is updated after new search', async () => {
    const fakeClient = new FakeBoclipsClient();
    const videos = [
      VideoFactory.sample({ id: '1', title: 'art' }),
      VideoFactory.sample({
        id: '2',
        title: 'artistic',
      }),
    ];

    videos.forEach((v) => fakeClient.videos.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=art']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect((await wrapper.findByTestId('search-hits')).textContent).toEqual(
      '2',
    );

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'artist' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    expect((await wrapper.findByTestId('search-hits')).textContent).toEqual(
      '1',
    );
  });

  it('can search for a new query', async () => {
    const fakeClient = new FakeBoclipsClient();
    const videos = [
      VideoFactory.sample({
        id: '1',
        title: 'dogs',
        description: 'dogs are nice',
      }),
      VideoFactory.sample({
        id: '2',
        title: 'cats',
        description: 'cats have nine lives',
      }),
    ];

    videos.forEach((v) => fakeClient.videos.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=dogs']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('dogs are nice')).toBeVisible();

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'cats' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    expect(await wrapper.findByText('cats have nine lives')).toBeVisible();
    expect(wrapper.queryByText('dogs are nice')).not.toBeInTheDocument();
  });

  it('renders the pagination', async () => {
    const fakeClient = new FakeBoclipsClient();

    const videos = [];
    for (let i = 0; i < 11; i++) {
      videos.push(
        VideoFactory.sample({
          id: `${i}`,
          title: `video ${i}`,
        }),
      );
    }

    videos.forEach((v) => fakeClient.videos.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('video 0')).toBeVisible();
    expect(wrapper.queryByText('video 10')).not.toBeInTheDocument();

    fireEvent.click(wrapper.getByText('2'));

    expect(await wrapper.findByText('video 10')).toBeVisible();
    expect(wrapper.queryByText('video 0')).not.toBeInTheDocument();
  });

  it(`displays the video type filters and facet counts`, async () => {
    const fakeClient = new FakeBoclipsClient();

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

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Video type')).toBeInTheDocument();
    expect(await wrapper.findByText('Educational')).toBeInTheDocument();
    expect(await wrapper.findByText('Raw Footage')).toBeInTheDocument();
    expect(await wrapper.findByText('News')).toBeInTheDocument();

    expect(await wrapper.findByText('888')).toBeInTheDocument();
    expect(await wrapper.findByText('666')).toBeInTheDocument();
    expect(await wrapper.findByText('1234321')).toBeInTheDocument();
  });

  it(`can filter videos by type`, async () => {
    const fakeClient = new FakeBoclipsClient();

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

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Video type')).toBeInTheDocument();

    expect(wrapper.queryByText('Educational')).toBeNull();
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

    expect(await wrapper.findByLabelText(/News/)).toBeInTheDocument();
    expect(await wrapper.findByText('news video')).toBeInTheDocument();
    expect(wrapper.queryByText('Raw Footage')).toBeNull();
    expect(wrapper.queryByText('stock video')).toBeNull();

    const selectedFiltersSection = wrapper.getByText('Selected filters')
      .parentElement;

    expect(within(selectedFiltersSection).getByText('News')).toBeVisible();
  });

  it(`applies filters from url on load`, async () => {
    const fakeClient = new FakeBoclipsClient();
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

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video&video_type=STOCK']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    const stockCheckbox = await wrapper.findByTestId('STOCK-checkbox');
    expect(stockCheckbox).toHaveProperty('checked', true);
    expect(await wrapper.findByText('Selected filters')).toBeVisible();
  });

  it(`persists queries between pages`, async () => {
    const fakeClient = new FakeBoclipsClient();

    for (let i = 0; i < 11; i++) {
      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: `video ${i}`,
          title: `video ${i}`,
          types: [{ id: 1, name: 'NEWS' }],
        }),
      );
    }
    fakeClient.videos.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 1 }),
        ],
      }),
    );

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    fireEvent.click(await wrapper.findByTestId('NEWS-checkbox'));
    expect(wrapper.getByTestId('NEWS-checkbox')).toHaveProperty(
      'checked',
      true,
    );

    expect(await wrapper.findByText('video 0')).toBeVisible();
    expect(wrapper.queryByText('video 10')).not.toBeInTheDocument();

    fireEvent.click(wrapper.getByText('2'));

    expect(wrapper.getByTestId('NEWS-checkbox')).toHaveProperty(
      'checked',
      true,
    );

    expect(await wrapper.findByText('video 10')).toBeVisible();
    expect(wrapper.queryByText('video 0')).not.toBeInTheDocument();
  });

  describe(`channel filters`, () => {
    it(`can filter channel filter options`, async () => {
      const fakeClient = new FakeBoclipsClient();

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

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Video type')).toBeInTheDocument();

      expect(await wrapper.findByText('Getty')).toBeInTheDocument();
      expect(await wrapper.findByText('Ted')).toBeInTheDocument();

      expect(await wrapper.findByText('whale video')).toBeInTheDocument();
      expect(await wrapper.findByText('shark video')).toBeInTheDocument();

      fireEvent.change(wrapper.getByPlaceholderText('Search for channel'), {
        target: { value: 'get' },
      });

      expect(await wrapper.findByText('Get')).toHaveClass('font-medium');
      expect(wrapper.queryByText('Ted')).toBeNull();

      fireEvent.click(wrapper.getByTestId('getty-id-checkbox'));

      expect(await wrapper.findByText('shark video')).toBeVisible();
      expect(await wrapper.queryByText('whale video')).toBeNull();
    });
  });

  describe('Subject filters', () => {
    it(`displays the subject filters and facet counts`, async () => {
      const fakeClient = new FakeBoclipsClient();

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          subjects: [{ id: 'subject1', name: 'History', hits: 12 }],
        }),
      );
      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Subject')).toBeInTheDocument();
      expect(await wrapper.findByText('History')).toBeInTheDocument();
      expect(await wrapper.findByText('12')).toBeInTheDocument();
    });
  });

  describe('Duration filters', () => {
    it(`displays the duration filters and facet counts`, async () => {
      const fakeClient = new FakeBoclipsClient();

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          durations: [
            { id: 'PT0S-PT1M', name: 'PT0S-PT1M', hits: 10 },
            { id: 'PT5M-PT10M', name: 'PT5M-PT10M', hits: 120 },
            { id: 'PT20M-PT24H', name: 'PT20M-PT24H', hits: 80 },
          ],
        }),
      );

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

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
    it(`displays the price filters and facet counts`, async () => {
      const fakeClient = new FakeBoclipsClient();

      fakeClient.videos.setFacets(
        FacetsFactory.sample({
          prices: [
            { id: '10000', name: '10000', hits: 10 },
            { id: '20000', name: '20000', hits: 120 },
            { id: '30000', name: '30000', hits: 80 },
          ],
        }),
      );

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Price')).toBeInTheDocument();
      expect(await wrapper.findByText('$100')).toBeInTheDocument();
      expect(await wrapper.findByText('$200')).toBeInTheDocument();
      expect(await wrapper.findByText('$300')).toBeInTheDocument();
    });

    it(`can filter videos by price`, async () => {
      const fakeClient = new FakeBoclipsClient();

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

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

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
      expect(await wrapper.findByText('cheap video')).toBeInTheDocument();
      expect(await wrapper.queryByText('expensive video')).toBeNull();

      const selectedFiltersSection = wrapper.getByText('Selected filters')
        .parentElement;

      expect(within(selectedFiltersSection).getByText('$100')).toBeVisible();
    });
  });

  describe('cart in video-card', () => {
    it(`displays add to cart button`, async () => {
      const fakeClient = new FakeBoclipsClient();

      fakeClient.videos.insertVideo(
        VideoFactory.sample({
          id: '2',
          title: 'news video',
          types: [{ name: 'NEWS', id: 2 }],
        }),
      );

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Add to cart')).toBeVisible();
    });

    it(`adds and removes item from cart when clicked`, async () => {
      const fakeClient = new FakeBoclipsClient();

      const video = VideoFactory.sample({
        id: 'video-id',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      });

      fakeClient.videos.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=vid']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Add to cart')).toBeInTheDocument();

      fireEvent(
        wrapper.getByText('Add to cart'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      const cart = await fakeClient.carts.getCart();

      await waitFor(() => {
        expect(cart.items).toHaveLength(1);
      });

      expect(wrapper.getByText('Remove from cart')).toBeInTheDocument();

      fireEvent(
        wrapper.getByText('Remove from cart'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      await waitFor(() => {
        expect(cart.items).toHaveLength(0);
      });
    });

    it(`basket counter goes up when item added to cart in navbar`, async () => {
      const fakeClient = new FakeBoclipsClient();

      const video = VideoFactory.sample({
        id: 'video-id',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      });

      fakeClient.videos.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=vid']}>
          <BoclipsClientProvider client={fakeClient}>
            <QueryClientProvider client={new QueryClient(queryClientConfig)}>
              <Navbar />
            </QueryClientProvider>
          </BoclipsClientProvider>
        </MemoryRouter>,
      );

      fakeClient.carts.insertCartItem('video-id');
      const cart = await fakeClient.carts.getCart();

      await waitFor(() => {
        const cartCounter = wrapper.getByTestId('cart-counter').innerHTML;
        expect(cartCounter).toBe(cart.items.length.toString());
      });
    });

    it(`directs to video page when card is clicked`, async () => {
      const fakeClient = new FakeBoclipsClient();

      const video = VideoFactory.sample({
        id: 'video-id',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      });

      fakeClient.videos.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=vid']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      fireEvent.click(await wrapper.findByText('news video'));

      await waitFor(() => {
        expect(wrapper.getByTestId('video-page')).toBeVisible();
      });
    });
  });
});
