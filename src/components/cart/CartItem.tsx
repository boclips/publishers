import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';

interface Props {
  videoItem: Video;
}

const CartItem = ({ videoItem }: Props) => {
  return (
    <div className="flex py-3 flex-row border-t-2 border-blue-300 justify-start ">
      <VideoPlayer video={videoItem} />

      <div className="flex flex-col w-full ml-3">
        <div className="text-md text-gray-900">{videoItem.title}</div>

        <AdditionalServices videoItem={videoItem} />
      </div>
    </div>
  );
};

export default CartItem;
