import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { VideoDescription } from 'src/components/videoPage/VideoDescription';
import { Video } from 'boclips-api-client/dist/types';
import { VideoAdditionalServices } from 'src/components/videoPage/VideoAdditionalServices';
import { VideoHeader } from 'src/components/videoPage/VideoHeader';
import { useHistory } from 'react-router-dom';
import BlueArrow from 'resources/icons/blue-arrow.svg';
import { FeatureGate } from 'src/components/common/FeatureGate';

interface Props {
  video: Video;
}

export const VideoPage = ({ video }: Props) => {
  const history: any = useHistory();
  const goToPreviousPage = () => {
    history.goBack();
  };

  const userNavigatedToPageViaApp = history.action === 'PUSH';

  return (
    <>
      <div className="col-start-1 col-end-18 row-start-2 row-end-2 h-full">
        {userNavigatedToPageViaApp && (
          <button
            type="button"
            className="text-blue-800 font-xs font-medium flex flex-row items-center mb-2"
            onClick={goToPreviousPage}
          >
            <BlueArrow className="transform rotate-90 mr-2" />
            Back
          </button>
        )}

        <VideoPlayer video={video} />
        <VideoDescription video={video} />
      </div>

      <div className="col-start-18 col-end-26 row-start-2 row-end-2">
        <VideoHeader video={video} />
        <FeatureGate feature="BO_WEB_APP_ADDITIONAL_SERVICES">
          <VideoAdditionalServices />
        </FeatureGate>
      </div>
    </>
  );
};
