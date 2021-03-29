import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { convertVideoFromApi } from 'src/services/convertVideoFromApi';
import { VideoCardV2 } from '@boclips-ui/video-card-v2';
import { PriceBadge } from 'src/components/videoCard/PriceBadge';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Link } from 'react-router-dom';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { getBrowserLocale } from 'src/services/getBrowserLocale';
import { trackNavigateToVideoDetails } from 'src/components/common/analytics/Analytics';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';
import s from './VideoCardWrapper.module.less';
import { VideoCardButtons } from './buttons/VideoCardButtons';

interface Props {
  video: Video;
}

export const VideoCardWrapper = ({ video }: Props) => {
  const boclipsClient = useBoclipsClient();

  const VideoCardTitle = () => {
    const onClick = () => {
      AnalyticsFactory.getAppcues().sendEvent(AppcuesEvent.VIDEO_PAGE_OPENED);
      trackNavigateToVideoDetails(video, boclipsClient);
    };
    return (
      <Link onClick={onClick} to={`/videos/${video.id}`}>
        <div className="text-gray-900">{video?.title}</div>
      </Link>
    );
  };

  return (
    <div className={s.videoCard}>
      <VideoCardV2
        key={video.id}
        video={convertVideoFromApi(video)}
        videoPlayer={<VideoPlayer video={video} showDurationBadge />}
        border="bottom"
        topBadge={
          <PriceBadge
            price={createPriceDisplayValue(
              video.price?.amount,
              video.price?.currency,
              getBrowserLocale(),
            )}
          />
        }
        title={<VideoCardTitle />}
        actions={[
          <VideoCardButtons
            video={video}
            key={`video-cart-buttons-${video.id}`}
          />,
        ]}
      />
    </div>
  );
};
