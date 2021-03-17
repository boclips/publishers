import './main.less';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import BoclipsSecurity from 'boclips-js-security';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import App from './App';

const apiClient = new FakeBoclipsClient();

ReactDom.render(
  <Router>
    <App apiClient={apiClient} />
  </Router>,
  document.getElementById('root'),
);

declare global {
  interface Window {
    helpers: {
      addVideos: () => void;
    };
  }
}

window.helpers = {
  addVideos: () => {
    const fakeVideosClient = apiClient.videos as FakeVideosClient;
    const videoURL =
      'https://storage.googleapis.com/boclips-fixtures/IMG_7670.mp4';
    const thumbnailURL =
      'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/0_z5uidsrj/width/304/vid_slices/3/vid_slice/1';

    fakeVideosClient.insertVideo(
      VideoFactory.sample({
        id: 'blah',
        title: 'test',
        links: {
          self: new Link({
            href: videoURL,
            templated: false,
          }),
          logInteraction: new Link({
            href: videoURL,
            templated: false,
          }),
        },
        playback: PlaybackFactory.sample({
          links: {
            hlsStream: new Link({
              href: videoURL,
              templated: false,
            }),
            createPlaybackEvent: new Link({
              href: 'https://api.boclips.com/v1/events/playback',
              templated: false,
            }),
            createPlayerInteractedWithEvent: new Link({
              href: 'https://api.boclips.com/v1/events/playback',
              templated: false,
            }),
            thumbnail: new Link({ href: thumbnailURL, templated: false }),
          },
        }),
      }),
    );
  },
};

const authOptions = {
  realm: 'nonexistent-realm',
  clientId: 'bogus-client-id',
  requireLoginPage: false,
  authEndpoint: 'http://localhost:9000/',
  onLogin: async () => {},
};

BoclipsSecurity.createInstance(authOptions);
