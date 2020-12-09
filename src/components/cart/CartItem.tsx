import { Player } from 'boclips-player-react';
import { playerOptions } from 'src/components/searchResults/VideoCardWrapper';
import React from 'react';
import { Video } from 'boclips-api-client/dist/types';

interface Props {
  item: Video;
}

export const CartItem = ({ item }: Props) => (
  <>
    <div className="flex flex-row border-t-2 border-blue-300 justify-start">
      <div className=" my-3">
        <Player
          videoUri={item.links.self.getOriginalLink()}
          borderRadius="4px"
          options={playerOptions}
        />
      </div>
      <span className="text-md mt-16 ml-3 ">{item.title}</span>
    </div>
  </>
);
