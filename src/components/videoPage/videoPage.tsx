import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Loading } from 'src/components/common/Loading';
import {
  VideoDetails,
  VideoHeader,
} from 'src/components/videoPage/videoPageContent';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { ErrorBoundary } from '../common/errors/ErrorBoundary';
import { RefreshPageError } from '../common/errors/refreshPageError/RefreshPageError';
import BlueArrow from '../../resources/icons/blue-arrow.svg';

export const VideoPage = () => {
  const videoId = useGetIdFromLocation('videos');
  const { data: video, isLoading } = useFindOrGetVideo(videoId);
  const history: any = useHistory();

  const goToPreviousPage = () => {
    history.goBack();
  };

  const userNavigatedToPageViaApp = history.action === 'PUSH';

  return (
    <>
      {isLoading && !video ? (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      ) : (
        <div
          data-qa="video-page"
          className="col-start-2 col-end-26 row-start-2 row-end-4 flex justify-between"
        >
          <ErrorBoundary fallback={<RefreshPageError />}>
            {video?.title && <Helmet title={video.title} />}
            <div className="w-2/3">
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
              <div className="mb-4">
                <VideoPlayer video={video} />
              </div>
              <VideoDetails video={video} />
            </div>
            <VideoHeader video={video} />
          </ErrorBoundary>
        </div>
      )}
    </>
  );
};
