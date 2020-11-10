import { fireEvent, render } from '@testing-library/react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import App from 'src/App';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';

describe('SearchResults', () => {
  let videosClient: any = null;

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
    expect(await wrapper.findByTestId('youtube-license')).toBeVisible();
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
});
