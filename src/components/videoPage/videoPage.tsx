import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Loading } from 'src/components/common/Loading';
import {
  VideoDetails,
  VideoHeader,
} from 'src/components/videoPage/videoPageContent';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { useQueryClient } from 'react-query';

export const VideoPage = () => {
  const queryClient = useQueryClient();
  const videoId = useGetIdFromLocation('videos');
  const { data: video, isLoading } = useFindOrGetVideo(queryClient, videoId);

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
          <div className="w-2/3">
            <div className="mb-4">
              <VideoPlayer video={video} />
            </div>
            <VideoDetails video={video} />
          </div>
          <VideoHeader video={video} />
        </div>
      )}
    </>
  );
};
