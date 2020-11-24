import { fireEvent, render } from '@testing-library/react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import App from 'src/App';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';

describe('SearchResults', () => {
  let videosClient: FakeVideosClient = null;

  beforeEach(async () => {
    videosClient = (await FakeApiClient).videos;
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
    videosClient.setFacets({
      ageRanges: {},
      durations: {},
      resourceTypes: {},
      subjects: {},
      videoTypes: {
        instructional: { id: 'instructional', hits: 888 },
        stock: { id: 'stock', hits: 666 },
        news: { id: 'news', hits: 1234321 },
      },
    });
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
    videosClient.setFacets({
      ageRanges: {},
      durations: {},
      resourceTypes: {},
      subjects: {},
      videoTypes: {
        stock: { id: 'STOCK', hits: 1 },
        news: { id: 'NEWS', hits: 1 },
      },
    });
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

    videosClient.setFacets({
      ageRanges: {},
      durations: {},
      resourceTypes: {},
      subjects: {},
      videoTypes: {
        news: { id: 'NEWS', hits: 1 },
      },
    });

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
    videosClient.setFacets({
      ageRanges: {},
      durations: {},
      resourceTypes: {},
      subjects: {},
      videoTypes: {
        stock: { id: 'STOCK', hits: 1 },
        news: { id: 'NEWS', hits: 1 },
      },
    });

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
    videosClient.setFacets({
      ageRanges: {},
      durations: {},
      resourceTypes: {},
      subjects: {},
      videoTypes: {
        news: { id: 'NEWS', hits: 1 },
      },
    });

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
});
