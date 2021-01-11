import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';
import { VideoPage } from 'src/components/videoPage/videoPage';

const VideoView = () => {
  return (
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <VideoPage />
      <Footer />
    </div>
  );
};

export default VideoView;
