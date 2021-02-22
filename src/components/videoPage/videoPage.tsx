import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Loading } from 'src/components/common/Loading';
import {
  VideoDetails,
  VideoHeader,
} from 'src/components/videoPage/videoPageContent';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { OmnscientErrorBoundary } from '../common/errors/OmniscientErrorBoundary';
import { RefreshPageError } from '../common/errors/refreshPageError/RefreshPageError';

export const VideoPage = () => {
  const videoId = useGetIdFromLocation('videos');
  const { data: video, isLoading } = useFindOrGetVideo(videoId);

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
          <OmnscientErrorBoundary fallback={<RefreshPageError />}>
            <div className="w-2/3">
              <div className="mb-4">
                <VideoPlayer video={video} />
              </div>
              <VideoDetails video={video} />
            </div>
            <VideoHeader video={video} />
          </OmnscientErrorBoundary>
        </div>
      )}
    </>
  );
};
