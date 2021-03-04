import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import AgeRangeBadge from '@boclips-ui/age-range-badge';
import AgeRange from '@boclips-ui/age-range';
import SubjectBadge from '@boclips-ui/subject-badge';
import React from 'react';

import s from './style.module.less';

interface Props {
  video: Video;
}

export const VideoDescription = ({ video }: Props) => {
  const ageRange = new AgeRange(video?.ageRange?.min, video?.ageRange?.max);

  return (
    <div className="mt-4 flex flex-col">
      <div className={s.badges}>
        <AgeRangeBadge ageRange={ageRange} />
        {video?.subjects?.map((subject) => (
          <SubjectBadge key={subject.id} subject={subject} />
        ))}
      </div>
      <div className="mt-4">{video?.description}</div>
      <div className="mt-4">{video?.additionalDescription}</div>
    </div>
  );
};
