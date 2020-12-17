import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import { VideoCardV2 } from '@boclips-ui/video-card-v2';
import { PriceBadge } from 'src/components/videoCard/PriceBadge';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';

interface Props {
  video: Video;
}

export const VideoCardWrapper = ({ video }: Props) => {
  return (
    <VideoCardV2
      key={video.id}
      video={convertVideoFromApi(video)}
      videoPlayer={<VideoPlayer video={video} />}
      border="bottom"
      theme="publishers"
      topBadge={<PriceBadge price={video.price?.displayValue} />}
      actions={[<AddToCartButton videoId={video.id} key="cart-button" />]}
    />
  );
};
