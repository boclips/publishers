import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import AgeRangeBadge from '@boclips-ui/age-range-badge';
import AgeRange from '@boclips-ui/age-range';
import SubjectBadge from '@boclips-ui/subject-badge';
import VideoCardAddCartButton from 'src/components/videoCardAddCartButton/VideoCardAddCartButton';
import React from 'react';
import dateFormat from 'dateformat';
import { CopyLinkButton } from 'src/components/common/CopyLinkButton';
import { buildVideoDetailsLink } from 'src/services/buildVideoDetailsLink';
import s from './videoPageContent.module.less';
import { createPriceDisplayValue } from '../../services/createPriceDisplayValue';

interface Props {
  video: Video;
}
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
      <div className="font-extralight mb-1 text-gray-700">{`ID: ${video?.id}`}</div>
      <div className="flex flex-row mb-6 text-gray-700">
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
      <div className="flex flex-row justify-end">
        <CopyLinkButton link={buildVideoDetailsLink(video)} />
        <span className="mr-2" />
        <VideoCardAddCartButton videoId={video?.id} />
      </div>
    </div>
  );
};
