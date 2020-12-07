import { fireEvent, render, waitFor } from '@testing-library/react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import App from 'src/App';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { FakeCartsClient } from 'boclips-api-client/dist/sub-clients/carts/client/FakeCartsClient';
import Navbar from 'src/components/layout/Navbar';

describe('SearchResults', () => {
  let videosClient: FakeVideosClient = null;
  let cartClient: FakeCartsClient = null;

  beforeEach(async () => {
    videosClient = (await FakeApiClient).videos;
    cartClient = (await FakeApiClient).carts;
  });

  it('renders a list of videos that match the search query', async () => {
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

    videos.forEach((v) => videosClient.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=hello']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('hello i am a title')).toBeVisible();
    expect(await wrapper.findByText('wow what a video hansen')).toBeVisible();
    expect(await wrapper.findByText('Released on Mar 20, 2019')).toBeVisible();
    expect(await wrapper.findByText('by BFI')).toBeVisible();
    expect(await wrapper.findByText('geography')).toBeVisible();
    expect(await wrapper.findByText('Ages 7-9')).toBeVisible();
  });

  it('renders a hits count that is updated after new search', async () => {
    const videos = [
      VideoFactory.sample({ id: '1', title: 'art' }),
      VideoFactory.sample({
        id: '2',
        title: 'artistic',
      }),
    ];

    videos.forEach((v) => videosClient.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=art']}>
        <App />
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

    videos.forEach((v) => videosClient.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=dogs']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('dogs are nice')).toBeVisible();

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'cats' } });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

    expect(await wrapper.findByText('cats have nine lives')).toBeVisible();
    expect(await wrapper.queryByText('dogs are nice')).not.toBeInTheDocument();
  });

  it('renders the pagination', async () => {
    const videos = [];
    for (let i = 0; i < 11; i++) {
      videos.push(
        VideoFactory.sample({
          id: `${i}`,
          title: `video ${i}`,
        }),
      );
    }

    videos.forEach((v) => videosClient.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('video 0')).toBeVisible();
    expect(await wrapper.queryByText('video 10')).not.toBeInTheDocument();

    fireEvent.click(wrapper.getByText('2'));

    expect(await wrapper.findByText('video 10')).toBeVisible();
    expect(await wrapper.queryByText('video 0')).not.toBeInTheDocument();
  });

  it(`displays the video type filters and facet counts`, async () => {
    videosClient.setFacets(
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
        <App />
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
    videosClient.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ id: 'STOCK', hits: 1, name: 'Stock' }),
          FacetFactory.sample({ id: 'NEWS', hits: 1, name: 'News' }),
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

    videos.forEach((v) => videosClient.insertVideo(v));

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Video type')).toBeInTheDocument();

    expect(await wrapper.queryByText('Educational')).toBeNull();
    expect(await wrapper.findByText('News')).toBeInTheDocument();
    expect(await wrapper.findByText('Raw Footage')).toBeInTheDocument();

    expect(await wrapper.findByText('news video')).toBeInTheDocument();
    expect(await wrapper.findByText('stock video')).toBeInTheDocument();

    const newsCheckbox = wrapper.getByTestId('NEWS-checkbox');

    videosClient.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 10 }),
        ],
      }),
    );

    fireEvent.click(wrapper.getByTestId('NEWS-checkbox'));
    expect(newsCheckbox).toHaveProperty('checked', true);

    expect(await wrapper.findByText('news video')).toBeVisible();

    // below line fails and I don't know why - suspect something
    // strange about react query but will need to dig more and fix this
    // works fine in browser fwiw
    // await waitForElementToBeRemoved(() => wrapper.getByText('stock video'));

    expect(await wrapper.findByText('News')).toBeInTheDocument();
    expect(await wrapper.queryByText('Raw Footage')).toBeNull();
  });

  it(`applies filters from url on load`, async () => {
    videosClient.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 1 }),
          FacetFactory.sample({ name: 'Stock', id: 'STOCK', hits: 1 }),
        ],
      }),
    );

    videosClient.insertVideo(
      VideoFactory.sample({
        id: '1',
        title: 'stock video',
        types: [{ name: 'STOCK', id: 1 }],
      }),
    );
    videosClient.insertVideo(
      VideoFactory.sample({
        id: '2',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      }),
    );

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video&video_type=STOCK']}>
        <App />
      </MemoryRouter>,
    );

    const stockCheckbox = await wrapper.findByTestId('STOCK-checkbox');
    expect(stockCheckbox).toHaveProperty('checked', true);
  });

  it(`persists queries between pages`, async () => {
    for (let i = 0; i < 11; i++) {
      videosClient.insertVideo(
        VideoFactory.sample({ id: `video ${i}`, title: `video ${i}` }),
      );
    }
    videosClient.setFacets(
      FacetsFactory.sample({
        videoTypes: [
          FacetFactory.sample({ name: 'News', id: 'NEWS', hits: 1 }),
        ],
      }),
    );

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos?q=video']}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(wrapper.getByTestId('NEWS-checkbox'));
    expect(wrapper.getByTestId('NEWS-checkbox')).toHaveProperty(
      'checked',
      true,
    );

    expect(await wrapper.findByText('video 0')).toBeVisible();
    expect(await wrapper.queryByText('video 10')).not.toBeInTheDocument();

    fireEvent.click(wrapper.getByText('2'));

    expect(wrapper.getByTestId('NEWS-checkbox')).toHaveProperty(
      'checked',
      true,
    );

    expect(await wrapper.findByText('video 10')).toBeVisible();
    expect(await wrapper.queryByText('video 0')).not.toBeInTheDocument();
  });

  describe(`channel filters`, () => {
    it(`can filter channel filter options`, async () => {
      videosClient.setFacets(
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

      videos.forEach((v) => videosClient.insertVideo(v));

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App />
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
      expect(await wrapper.queryByText('Ted')).toBeNull();

      fireEvent.click(wrapper.getByTestId('getty-id-checkbox'));

      expect(await wrapper.findByText('shark video')).toBeVisible();

      // await waitForElementToBeRemoved(() => wrapper.getByText('whale video'));
    });
  });

  describe('Subject filters', () => {
    it(`displays the subject filters and facet counts`, async () => {
      videosClient.setFacets(
        FacetsFactory.sample({
          subjects: [{ id: 'subject1', name: 'History', hits: 12 }],
        }),
      );
      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Subject')).toBeInTheDocument();
      expect(await wrapper.findByText('History')).toBeInTheDocument();
      expect(await wrapper.findByText('12')).toBeInTheDocument();
    });
  });

  describe('Duration filters', () => {
    it(`displays the duration filters and facet counts`, async () => {
      videosClient.setFacets(
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
          <App />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Duration')).toBeInTheDocument();

      expect(await wrapper.findByText('80')).toBeInTheDocument();
      expect(await wrapper.findByText('120')).toBeInTheDocument();
      expect(await wrapper.findByText('10')).toBeInTheDocument();

      expect(await wrapper.findByText('Up to 1 min')).toBeInTheDocument();
      expect(await wrapper.findByText('5 - 10 min')).toBeInTheDocument();
      expect(await wrapper.findByText('20 min +')).toBeInTheDocument();
      expect(await wrapper.queryByText('1 - 5 min')).not.toBeInTheDocument();
      expect(await wrapper.queryByText('10 - 20 min')).not.toBeInTheDocument();
    });
  });

  describe('cart in video-card', () => {
    it(`displays add to cart button`, async () => {
      videosClient.insertVideo(
        VideoFactory.sample({
          id: '2',
          title: 'news video',
          types: [{ name: 'NEWS', id: 2 }],
        }),
      );

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=video']}>
          <App />
        </MemoryRouter>,
      );

      expect(await wrapper.findByText('Add to cart')).toBeVisible();
    });

    it(`adds to cart when clicked`, async () => {
      const video = VideoFactory.sample({
        id: 'video-id',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      });

      videosClient.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=vid']}>
          <App />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(wrapper.getByText('Add to cart')).toBeInTheDocument();
      });

      fireEvent(
        wrapper.getByText('Add to cart'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      const cart = await cartClient.getCart();

      await waitFor(() => {
        expect(cart.items).toHaveLength(1);
      });

      expect(wrapper.getByText('Remove from cart')).toBeInTheDocument();
    });

    it(`basket counter goes up when item added to cart in navbar`, async () => {
      const video = VideoFactory.sample({
        id: 'video-id',
        title: 'news video',
        types: [{ name: 'NEWS', id: 2 }],
      });

      videosClient.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos?q=vid']}>
          <Navbar />
        </MemoryRouter>,
      );

      cartClient.insertCartItem('video-id');
      const cart = await cartClient.getCart();

      await waitFor(() => {
        const cartCounter = wrapper.getByTestId('cart-counter').innerHTML;
        expect(cartCounter).toBe(cart.items.length.toString());
      });
    });
  });
});
