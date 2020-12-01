import { Player } from 'boclips-player-react';
import { playerOptions } from 'src/components/searchResults/VideoCardWrapper';
import React from 'react';
import { Video } from 'boclips-api-client/dist/types';

interface Props {
  item: Video;
}

export const CartItem = ({ item }: Props) => (
  <>
    <div className="col-start-13 col-end-5">
      <Player
        videoUri={item.links.self.getOriginalLink()}
        borderRadius="4px"
        options={playerOptions}
      />
    </div>
    <div className="col-start-5 col-end-14 text-md">{item.title}</div>
  </>
);
