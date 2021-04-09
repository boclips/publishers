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
    fixture: (subject: Subject, name: VideoFixtureName) => void;
    video: (video: Partial<Video>) => void;
    subject: (subject: Subject) => void;
    cart: (cart: Partial<Cart>) => void;
  };
  inspect: () => FakeBoclipsClient;
  set: {
    facets: (facet: Partial<VideoFacets>) => void;
  };
}

type VideoFixtureName = 'eel-sex' | 'eel-double-jaws';

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
    fixture: (subject: Subject, name: VideoFixtureName) => {
      switch (name) {
        case 'eel-sex': {
          const details: Partial<Video> = {
            title:
              'TED-Ed: No one can figure out how eels have sex | Lucy Cooke',
            description:
              `From Ancient Greece to the 20th century, Aristotle, Freud, and numerous other scholars were all looking for ` +
              `the same thing: eel testicles. Freshwater eels could be found in rivers across Europe, but no one had ever seen ` +
              `them mate and no researcher could find eel eggs or identify their reproductive organs. So how do eels reproduce, ` +
              `and where do they do it? Lucy Cooke digs into the ancient mystery. [Directed by Anton Bogaty, narrated by Adrian ` +
              `Dannatt, music by Jarrett Farkas].`,
            subjects: [subject],
          };
          const fakeVideosClient = apiClient.videos as FakeVideosClient;
          const videoURL =
            'https://cdnapisec.kaltura.com/p/1776261/sp/177626100/playManifest/entryId/1_0jat7z15/format/applehttp/flavorParamIds/487041%2C487051%2C487061%2C487071%2C487081%2C487091%2C487111%2C1049881/protocol/https/video.mp4';

          fakeVideosClient.insertVideo(
            VideoFactory.sample({
              id: 'blah',
              title: 'test',
              playback: PlaybackFactory.sample({
                links: {
                  createPlaybackEvent: null,
                  createPlayerInteractedWithEvent: null,
                  download: null,
                  thumbnail: new Link({
                    href:
                      'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/1_0jat7z15/width/1121/vid_slices/3/vid_slice/1',
                  }),
                  setThumbnailBySecond: null,
                  setCustomThumbnail: null,
                  deleteThumbnail: null,
                  videoPreview: null,
                  hlsStream: new Link({ href: videoURL }),
                },
              }),
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
              ...details,
            }),
          );
          break;
        }

        case 'eel-double-jaws': {
          break;
        }

        default: {
          break;
        }
      }
    },
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
        'https://cdnapisec.kaltura.com/p/1776261/sp/177626100/playManifest/entryId/1_0jat7z15/format/applehttp/flavorParamIds/487041%2C487051%2C487061%2C487071%2C487081%2C487091%2C487111%2C1049881/protocol/https/video.mp4';

      fakeVideosClient.insertVideo(
        VideoFactory.sample({
          id: 'blah',
          title: 'test',
          playback: PlaybackFactory.sample({
            links: {
              createPlaybackEvent: null,
              createPlayerInteractedWithEvent: null,
              download: null,
              thumbnail: new Link({
                href:
                  'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/1_0jat7z15/width/1121/vid_slices/3/vid_slice/1',
              }),
              setThumbnailBySecond: null,
              setCustomThumbnail: null,
              deleteThumbnail: null,
              videoPreview: null,
              hlsStream: new Link({ href: videoURL }),
            },
          }),
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
