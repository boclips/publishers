import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { FakeCartsClient } from 'boclips-api-client/dist/sub-clients/carts/client/FakeCartsClient';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';

describe('CartView', () => {
  let videosClient: FakeVideosClient = null;
  let cartClient: FakeCartsClient = null;

  beforeEach(async () => {
    videosClient = (await FakeApiClient).videos;
    cartClient = (await FakeApiClient).carts;
  });

  it('when no items in cart, displays empty cart view', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(async () => {
      expect(
        await wrapper.findByText('There are no items in your shopping cart'),
      ).toBeInTheDocument();
    });
  });

  it('when videos in cart, displays video player with title ', async () => {
    const video = VideoFactory.sample({
      id: 'video-id',
      title: 'news video',
      types: [{ name: 'NEWS', id: 2 }],
    });

    videosClient.insertVideo(video);

    cartClient.insertCartItem('video-id');

    const wrapper = render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(async () => {
      expect(await wrapper.findByText('Shopping cart')).toBeInTheDocument();
      expect(await wrapper.findByText('(1 item)')).toBeInTheDocument();
      expect(await wrapper.findByText('news video')).toBeInTheDocument();
    });
  });
});
