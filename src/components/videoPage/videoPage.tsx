import { Link } from 'react-router-dom';
import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import { Loading } from 'src/components/common/Loading';
import {
  VideoDetails,
  VideoHeader,
} from 'src/components/videoPage/videoPageContent';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import Arrow from '../../resources/icons/blue-arrow.svg';

export const VideoPage = () => {
  const videoId = useGetIdFromLocation('videos');
  const { data, isLoading } = useFindOrGetVideo(videoId);

  return (
    <>
      {isLoading && !data ? (
        <div className="grid-cols-24 row-span-3 col-start-2 col-end-26 h-auto rounded-lg">
          <Loading />
        </div>
      ) : (
        <div className="col-start-2 col-end-26 row-start-2 row-end-4 flex justify-between">
          <div className="w-2/3">
            <Link to="/videos" className="flex flex-row mb-4">
              <Arrow className="w-3 mr-3 self-center transform rotate-90" />
              <span className="text-blue-800">Back to search results</span>
            </Link>
            <div className="mb-4">
              <VideoPlayer video={data} />
            </div>
            <VideoDetails video={data} />
          </div>
          <VideoHeader video={data} />
        </div>
      )}
    </>
  );
};
