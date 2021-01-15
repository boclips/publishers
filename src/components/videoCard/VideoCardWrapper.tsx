import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import { VideoCardV2 } from '@boclips-ui/video-card-v2';
import { PriceBadge } from 'src/components/videoCard/PriceBadge';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Link } from 'react-router-dom';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import s from './VideoCardWrapper.module.less';

interface Props {
  video: Video;
}

export const VideoCardWrapper = ({ video }: Props) => {
  return (
    <div className={s.videoCard}>
      <VideoCardV2
        key={video.id}
        video={convertVideoFromApi(video)}
        videoPlayer={<VideoPlayer video={video} />}
        border="bottom"
        topBadge={
          <PriceBadge
            price={createPriceDisplayValue(
              video.price?.amount,
              video.price?.currency,
              navigator.language,
            )}
          />
        }
        title={
          <Link to={`/videos/${video.id}`}>
            <div className="text-grey-900">{video?.title}</div>
          </Link>
        }
        actions={[<AddToCartButton videoId={video.id} key="cart-button" />]}
      />
    </div>
  );
};
