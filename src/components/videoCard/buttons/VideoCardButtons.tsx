import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import { FeatureGate } from 'src/components/common/FeatureGate';
import { CopyVideoLinkButton } from './CopyVideoLinkButton';
import { CopyLegacyVideoLinkButton } from './CopyLegacyVideoLinkButton';

interface VideoCardButtonsProps {
  video: Video;
}
export const VideoCardButtons = ({ video }: VideoCardButtonsProps) => {
  return (
    <div className="flex flex-row justify-end" key={`copy-${video.id}`}>
      <FeatureGate feature="BO_WEB_APP_COPY_OLD_LINK_BUTTON">
        <CopyLegacyVideoLinkButton video={video} />
      </FeatureGate>

      <CopyVideoLinkButton
        width="140px"
        video={video}
        appcueEvent={AppcuesEvent.COPY_LINK_FROM_SEARCH_RESULTS}
      />

      <AddToCartButton
        video={video}
        key="cart-button"
        width="148px"
        appcueEvent={AppcuesEvent.ADD_TO_CART_FROM_SEARCH_RESULTS}
      />
    </div>
  );
};
