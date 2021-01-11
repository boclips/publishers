import { Link } from 'react-router-dom';
import React from 'react';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import LeftArrow from 'src/resources/icons/filter-arrow-left.svg';
import { Loading } from 'src/components/common/Loading';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import {
  VideoDetails,
  VideoHeader,
} from 'src/components/videoPage/videoPageContent';
import { useGetOrFindVideo } from 'src/hooks/api/videoQuery';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';

export const VideoPage = () => {
  const videoId = useGetIdFromLocation('videos');
  const { data, isLoading } = useGetOrFindVideo(videoId);

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
              <LeftArrow className="w-2 mr-3 self-center" />
              <span className="text-blue-800">Back to search results</span>
            </Link>
            <div className="mb-4">
              <VideoPlayer video={data || undefined} />
            </div>
            <VideoDetails video={data as Video} />
          </div>
          <VideoHeader video={data as Video} />
        </div>
      )}
    </>
  );
};
