import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { VideoCard } from '@boclips-ui/video-card';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import { PlayerOptions } from 'boclips-player';
import { Player } from 'boclips-player-react';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';

interface Props {
  video: Video;
}

export const playerOptions: Partial<PlayerOptions> = {
  interface: {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'captions',
      'fullscreen',
      'settings',
    ],
    ratio: '16:9',
  },
};

const resolvePrice = (video: Video): string => {
  if (typeof video.types === 'undefined') {
    return '$600';
  }

  const prices = video.types.map((type) => {
    switch (type.name) {
      case 'Stock':
        return 150;
      case 'News':
        return 300;
      case 'Instructional Clips':
        return 600;
      default:
        return 600;
    }
  });

  return `$${Math.max(...prices)}`;
};

export const VideoCardWrapper = ({ video }: Props) => {
  return (
    <VideoCard
      key={video.id}
      price={resolvePrice(video)}
      videoPlayer={
        <Player
          videoUri={video.links.self.getOriginalLink()}
          borderRadius="4px"
          options={playerOptions}
        />
      }
      border="bottom"
      video={convertVideoFromApi(video)}
      authenticated
      hideAttachments
      hideBestFor
      theme="publishers"
      videoActionButtons={[
        <AddToCartButton videoId={video.id} key="cart-button" />,
      ]}
      videoRoundedCorners
    />
  );
};
