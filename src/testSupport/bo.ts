import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import {
  FacetFactory,
  FacetsFactory,
} from 'boclips-api-client/dist/test-support/FacetsFactory';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { Subject } from 'boclips-api-client/dist/sub-clients/subjects/model/Subject';
import { UserFeatureKey } from 'boclips-api-client/dist/sub-clients/organisations/model/User';

export interface Bo {
  create: {
    fixtureSet: {
      eelsBiologyGeography: () => void;
    };
    video: (video: Partial<Video>) => void;
    subject: (subject: Subject) => void;
    cartWithVideos: () => void;
  };
  inspect: () => FakeBoclipsClient;
  set: {
    facets: (facet: Partial<VideoFacets>) => void;
    features: (features: { [key in UserFeatureKey]?: boolean }) => void;
  };
}

export function bo(apiClient: FakeBoclipsClient): Bo {
  const boSetFacets = (facets: Partial<VideoFacets>) => {
    apiClient.videos.setFacets(
      FacetsFactory.sample({
        prices: [FacetFactory.sample({ hits: 10, id: '1000', name: '1000' })],
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
  };

  const boSetFeatures = (
    features: {
      [key in UserFeatureKey]?: boolean;
    },
  ) => {
    apiClient.users.setCurrentUserFeatures(features);
  };

  const boCreateSubject = (subject: Subject) => {
    apiClient.subjects.insertSubject(subject);
  };

  const boCreateVideo = (video: Partial<Video>) => {
    const fakeVideosClient = apiClient.videos as FakeVideosClient;
    const videoURL = 'http://localhost:9000/assets/blank.mp4';

    fakeVideosClient.insertVideo(
      VideoFactory.sample({
        id: Math.random().toString(36).substring(2, 15),
        title: 'test',
        price: { amount: 1000, currency: 'USD' },
        playback: PlaybackFactory.sample({
          links: {
            createPlaybackEvent: null,
            createPlayerInteractedWithEvent: null,
            download: null,
            thumbnail: new Link({
              href: 'http://localhost:9000/assets/icons/not-found.svg',
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
  };

  return {
    inspect: () => apiClient,

    set: {
      facets: boSetFacets,
      features: boSetFeatures,
    },

    create: {
      video: boCreateVideo,
      subject: boCreateSubject,

      cartWithVideos: () => {
        apiClient.videos.insertVideo(
          VideoFactory.sample({
            id: '5f75b73f22a6495bdf2c2d14',
            title:
              'TED-Ed: No one can figure out how eels have sex | Lucy Cooke',
          }),
        );

        apiClient.videos.insertVideo(
          VideoFactory.sample({
            id: '123',
            title:
              'Jason & The Argonauts - The Epic Quest for the Golden Fleece (Greek Mythology)',
          }),
        );

        apiClient.carts.addItemToCart(null, '5f75b73f22a6495bdf2c2d14');
        apiClient.carts.addItemToCart(null, '123');
      },

      fixtureSet: {
        eelsBiologyGeography: () => {
          const biology: Subject = SubjectFactory.sample({
            id: 'biology-id',
            name: 'Biology and Environmental Science',
          });
          const geography: Subject = SubjectFactory.sample({
            id: 'geography-id',
            name: 'Geography and Earth Science',
          });

          boCreateSubject(geography);
          boCreateSubject(biology);

          boCreateVideo({
            title:
              'TED-Ed: No one can figure out how eels have sex | Lucy Cooke',
            description:
              `From Ancient Greece to the 20th century, Aristotle, Freud, and numerous other scholars were all looking for ` +
              `the same thing: eel testicles. Freshwater eels could be found in rivers across Europe, but no one had ever seen ` +
              `them mate and no researcher could find eel eggs or identify their reproductive organs. So how do eels reproduce, ` +
              `and where do they do it? Lucy Cooke digs into the ancient mystery. [Directed by Anton Bogaty, narrated by Adrian ` +
              `Dannatt, music by Jarrett Farkas].`,
            subjects: [biology],
          });

          boCreateVideo({
            title: 'Eel with DOUBLE JAWS has one Nasty Bite!',
            description:
              `On this episode, Mark and the crew are back in Queensland, Australia for another epic Tide Pool adventure!` +
              `As Mark explores, he comes across a Snowflake Eel - and this eel has double jaws.. and one nasty bite! ` +
              `What other creatures do you think they will come across along the Australian coast? Watch now to find out!`,
            subjects: [geography],
          });

          boSetFacets(
            FacetsFactory.sample({
              subjects: [
                FacetFactory.sample({
                  id: biology.id,
                  name: biology.name,
                  hits: 1,
                }),
                FacetFactory.sample({
                  id: geography.id,
                  name: geography.name,
                  hits: 1,
                }),
              ],
            }),
          );
        },
      },
    },
  };
}
