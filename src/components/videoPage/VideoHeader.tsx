import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import { CopyVideoLinkButton } from 'src/components/common/copyLinkButton/CopyVideoLinkButton';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import React from 'react';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import dateFormat from 'dateformat';

interface Props {
  video: Video;
}

export const VideoHeader = ({ video }: Props) => {
  return (
    <>
      <div className="text-lg font-medium text-gray-900 mb-2">
        {video?.title}
      </div>
      <div className="font-extralight mb-1 text-gray-800">{`ID: ${video?.id}`}</div>
      <div className="flex flex-row mb-6 text-gray-800">
        <div>{`Released on ${dateFormat(
          video?.releasedOn,
          'mediumDate',
        )} by`}</div>
        <div className="font-medium ml-1">{video?.createdBy}</div>
      </div>
      <div className="font-bold text-2xl text-gray-900">
        {createPriceDisplayValue(
          video?.price?.amount,
          video?.price?.currency,
          navigator.language,
        )}
      </div>
      <div className="grey-800 mb-4">
        This is an agreed price for your organization
      </div>
      <div className="flex flex-row " style={{ width: '100%' }}>
        <CopyVideoLinkButton
          video={video}
          width="50%"
          appcueEvent={AppcuesEvent.COPY_LINK_FROM_VIDEO_PAGE}
        />
        <AddToCartButton
          videoId={video?.id}
          width="50%"
          appcueEvent={AppcuesEvent.ADD_TO_CART_FROM_VIDEO_PAGE}
        />
      </div>
    </>
  );
};
