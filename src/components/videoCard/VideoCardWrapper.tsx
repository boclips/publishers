import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import { VideoCardV2 } from '@boclips-ui/video-card-v2';
import { PriceBadge } from 'src/components/videoCard/PriceBadge';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Link } from 'react-router-dom';
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
        topBadge={<PriceBadge price={video.price?.displayValue} />}
        title={
          <Link
            className="no-underline text-black hover:text-black"
            to={`videos/${video.id}`}
          >
            {video?.title}
          </Link>
        }
        actions={[<AddToCartButton videoId={video.id} key="cart-button" />]}
      />
    </div>
  );
};
