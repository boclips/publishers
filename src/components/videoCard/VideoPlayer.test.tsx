import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { render } from '@testing-library/react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { PlayerFactory } from 'boclips-player';
import { mocked } from 'ts-jest/utils';
import BoclipsSecurity from 'boclips-js-security';

describe(`VideoPlayer`, () => {
  it('provides a token factory to the player that returns a valid token', async () => {
    jest.spyOn(BoclipsSecurity, 'getInstance').mockImplementation(() => ({
      logout: jest.fn(),
      isAuthenticated: () => false,
      getTokenFactory: () => () => Promise.resolve('test-token'),
      configureAxios: jest.fn(),
      ssoLogin: jest.fn(),
    }));

    const video = VideoFactory.sample({ id: 'test-id' });
    render(<VideoPlayer video={video} />);

    expect(PlayerFactory.get).toHaveBeenCalled();

    const options = mocked(PlayerFactory.get).mock.calls[0][1];
    const providedTokenFactory = options.api.tokenFactory;

    await expect(providedTokenFactory()).resolves.toEqual('test-token');
  });
});
