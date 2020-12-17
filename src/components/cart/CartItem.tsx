import React from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';

interface Props {
  item: Video;
}

export const CartItem = ({ item }: Props) => (
  <>
    <div className="flex flex-row border-b-2 border-blue-300 justify-start">
      <div className=" my-3">
        <VideoPlayer video={item} />
      </div>
      <span className="text-md mt-16 ml-3">{item.title}</span>
    </div>
  </>
);
