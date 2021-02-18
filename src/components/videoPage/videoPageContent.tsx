import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import AgeRangeBadge from '@boclips-ui/age-range-badge';
import AgeRange from '@boclips-ui/age-range';
import SubjectBadge from '@boclips-ui/subject-badge';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import React from 'react';
import dateFormat from 'dateformat';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import { AnalyticsTrackClick } from 'src/components/common/analytics/AnalyticsTrackClick';
import s from './videoPageContent.module.less';
import { CopyVideoLinkButton } from '../common/copyLinkButton/CopyVideoLinkButton';
import InfoIcon from '../../resources/icons/info.svg';

interface Props {
  video: Video;
}

const AdditionalServicesInformation = () => {
  return (
    <div className="mt-8 bg-blue-100 p-6 rounded text-gray-800">
      <div className="flex flex-row font-medium text-base items-center mb-2 text-gray-900">
        <InfoIcon />
        <div className="ml-2">Additional services</div>
      </div>
      <div className="text-sm">
        Captions, transcripts, video trimming, and other editing requests are
        available upon request from your shopping cart. All additional services
        are available free of charge.
      </div>
    </div>
  );
};

export const VideoDetails = ({ video }: Props) => {
  return (
    <div className="flex flex-col">
      <div className={s.badges}>
        <AgeRangeBadge
          ageRange={
            new AgeRange(video?.ageRange?.min, video?.ageRange?.max) ||
            undefined
          }
        />
        {video?.subjects?.map((subject) => (
          <SubjectBadge key={subject.id} subject={subject} />
        ))}
      </div>
      <div>{video?.description}</div>
      <div className="mt-3">{video?.additionalDescription}</div>
    </div>
  );
};

export const VideoHeader = ({ video }: Props) => {
  return (
    <div className="w-1/3 ml-4">
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
      <div className="flex flex-row">
        <AnalyticsTrackClick eventType={AppcuesEvent.COPY_LINK_FROM_VIDEO_PAGE}>
          <CopyVideoLinkButton video={video} />
        </AnalyticsTrackClick>
        <span className="w-1/2">
          <AnalyticsTrackClick
            eventType={AppcuesEvent.ADD_TO_CART_FROM_VIDEO_PAGE}
          >
            <span role="presentation">
              <AddToCartButton videoId={video?.id} />
            </span>
          </AnalyticsTrackClick>
        </span>
      </div>
      <AdditionalServicesInformation />
    </div>
  );
};
