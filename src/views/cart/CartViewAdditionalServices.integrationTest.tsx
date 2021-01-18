import { fireEvent, render } from '@testing-library/react';
import { FakeCartsClient } from 'boclips-api-client/dist/sub-clients/carts/client/FakeCartsClient';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { PlayerFactory } from 'boclips-player';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';

describe('CartViewAdditionalServices', () => {
  let cartClient: FakeCartsClient = null;
  let videosClient: FakeVideosClient = null;

  beforeEach(async () => {
    cartClient = (await FakeApiClient).carts;
    videosClient = (await FakeApiClient).videos;
  });

  it('remembers users selection of trimming in cart', async () => {
    const video = VideoFactory.sample({
      id: 'video-id',
      title: 'news video',
      types: [{ name: 'NEWS', id: 2 }],
      // playback: PlaybackFactory.sample({
      //   duration:
      // })
    });

    videosClient.insertVideo(video);
    cartClient.insertCartItem(video.id);

    const wrapper = render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>,
    );

    const trimVideoCheckBox = await wrapper.findByLabelText('Trim video');
    fireEvent.click(trimVideoCheckBox);

    const fromInput = wrapper.getByLabelText('trim-from') as HTMLInputElement;
    fireEvent.change(fromInput, { target: { value: '00:02' } });

    const homeLogo = wrapper.getByTitle('Boclips logo');
    fireEvent.click(homeLogo);

    const cartLink = await wrapper.findByText('Cart');
    fireEvent.click(cartLink);
    fireEvent.click(await wrapper.findByLabelText('Trim video'));
    expect(
      (wrapper.getByLabelText('trim-from') as HTMLInputElement).value,
    ).toEqual('00:02');
  });
});
