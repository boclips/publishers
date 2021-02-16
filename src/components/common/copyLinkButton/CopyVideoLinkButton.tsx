import Button from '@boclips-ui/button';
import { Video } from 'boclips-api-client/dist/types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyLinkIcon from 'src/resources/icons/copy-link-icon.svg';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { buildVideoDetailsLink } from 'src/services/buildVideoDetailsLink';
import s from './style.module.less';
<<<<<<< HEAD
import { trackCopyVideoShareLink } from '../analytics/Analytics';
=======
>>>>>>> wip

interface Props {
  video: Video;
}

export const CopyVideoLinkButton = ({ video }: Props) => {
  const apiClient = useBoclipsClient();

  const link = buildVideoDetailsLink(video);

  return (
    <div className={`h-12 flex justify-end mt-2 ${s.copyLinkButton} mr-2`}>
      <CopyToClipboard text={link}>
        <Button
<<<<<<< HEAD
          onClick={() => trackCopyVideoShareLink(video, apiClient)}
=======
          onClick={() =>
            apiClient.events.trackVideoInteraction(video, 'COPY_SHARE_LINK')
          }
>>>>>>> wip
          text="Copy link"
          type="outline"
          width="100%"
          icon={<CopyLinkIcon />}
        />
      </CopyToClipboard>
    </div>
  );
};
