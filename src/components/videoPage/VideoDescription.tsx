import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import SubjectBadge from '@boclips-ui/subject-badge';
import React from 'react';

import s from './style.module.less';

interface Props {
  video: Video;
}

export const VideoDescription = ({ video }: Props) => {
  return (
    <div className="mt-4 flex flex-col">
      <div className={s.badges}>
        {video?.subjects?.map((subject) => (
          <SubjectBadge key={subject.id} subject={subject} />
        ))}
      </div>
      <div className="mt-4">{video?.description}</div>
      <div className="mt-4">{video?.additionalDescription}</div>
    </div>
  );
};
