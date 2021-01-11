import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import AgeRangeBadge from '@boclips-ui/age-range-badge';
import AgeRange from '@boclips-ui/age-range';
import SubjectBadge from '@boclips-ui/subject-badge';
import AddToCartButton from 'src/components/addToCartButton/AddToCartButton';
import React from 'react';
import dateFormat from 'dateformat';

interface Props {
  video: Video;
}
export const VideoDetails = ({ video }: Props) => {
  return (
    <>
      <div className="flex flex-row">
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
      <br />
      <div>{video?.additionalDescription}</div>
    </>
  );
};

export const VideoHeader = ({ video }: Props) => {
  return (
    <div className="w-1/3 ml-4">
      <div className="text-lg font-medium	mb-2">{video?.title}</div>
      <div className="font-extralight mb-1">{`ID: ${video?.id}`}</div>
      <div className="flex flex-row mb-6">
        <div>{`Released on ${dateFormat(
          video?.releasedOn,
          'mediumDate',
        )} by`}</div>
        <div className="font-medium ml-1">{video?.createdBy}</div>
      </div>
      <div className="font-medium text-2xl">{video?.price?.displayValue}</div>
      <AddToCartButton videoId={video?.id} />
    </div>
  );
};
