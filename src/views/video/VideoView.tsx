import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { VideoPage } from 'src/components/videoPage/VideoPage';
import { useGetIdFromLocation } from 'src/hooks/useLocationParams';
import { useFindOrGetVideo } from 'src/hooks/api/videoQuery';
import { Loading } from 'src/components/common/Loading';
import { Helmet } from 'react-helmet';

const VideoView = () => {
  const videoId = useGetIdFromLocation('videos');
  const { data: video, isLoading } = useFindOrGetVideo(videoId);

  if (isLoading && !video) return <Loading />;

  return (
    <div
      data-qa="video-page"
      className="grid grid-rows-video-view grid-cols-container gap-6"
    >
      {video?.title && <Helmet title={video.title} />}
      <Navbar showSearchBar />
      <VideoPage video={video} />
      <Footer />
    </div>
  );
};

export default VideoView;
