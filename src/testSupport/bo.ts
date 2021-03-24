import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Subject } from 'boclips-api-client/dist/sub-clients/subjects/model/Subject';
import { Cart } from 'boclips-api-client/dist/sub-clients/carts/model/Cart';

export interface Bo {
  create: {
    video: (video: Partial<Video>) => void;
    subject: (subject: Subject) => void;
    cart: (cart: Partial<Cart>) => void;
  };
  inspect: () => FakeBoclipsClient;
  set: {
    facets: (facet: Partial<VideoFacets>) => void;
  };
}

export const bo = (apiClient: FakeBoclipsClient): Bo => ({
  inspect: () => apiClient,

  set: {
    facets: (facets: Partial<VideoFacets>) => {
      apiClient.videos.setFacets(
        FacetsFactory.sample({
          channels: [
            FacetFactory.sample({
              hits: 17,
              id: 'channel-id',
              name: 'our channel',
            }),
          ],
          ...facets,
        }),
      );
    },
  },

  create: {
    subject: (subject: Subject) => {
      apiClient.subjects.insertSubject(subject);
    },
    cart: () => {
      apiClient.videos.insertVideo(
        VideoFactory.sample({
          id: 'blah',
          title: 'test',
        }),
      );

      apiClient.carts.addItemToCart(null, 'blah');
    },
    video: (video: Partial<Video>) => {
      const fakeVideosClient = apiClient.videos as FakeVideosClient;
      const videoURL =
        'https://storage.googleapis.com/boclips-fixtures/IMG_7670.mp4';

      fakeVideosClient.insertVideo(
        VideoFactory.sample({
          id: 'blah',
          title: 'test',
          playback: PlaybackFactory.sample(),
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
          ...video,
        }),
      );
    },
  },
});
