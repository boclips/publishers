import Button from '@boclips-ui/button';
import { Video } from 'boclips-api-client/dist/types';
import React, { useState } from 'react';
import CopyLinkIcon from 'src/resources/icons/copy-link-icon.svg';
import CopiedLinkIcon from 'src/resources/icons/copied-link-icon.svg';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';
import { buildVideoDetailsLink } from 'src/services/buildVideoDetailsLink';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import s from './style.module.less';
import { trackCopyVideoShareLink } from '../analytics/Analytics';

interface Props {
  video: Video;
  width?: string;
}

export const CopyVideoLinkButton = ({ video, width }: Props) => {
  const apiClient = useBoclipsClient();
  const { data: user, isFetched } = useGetUserQuery();

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyLink = () => {
    const linkToCopy = buildVideoDetailsLink(video, user);
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopiedToClipboard(true);
      trackCopyVideoShareLink(video, apiClient);
    });

    setTimeout(() => {
      setCopiedToClipboard(false);
    }, 1500);
  };

  return (
    <div
      style={{ width }}
      className={`h-12 flex justify-end ${s.copyLinkButton} mr-2`}
    >
      <Button
        data-qa={`copy-button-${video.id}`}
        onClick={copyLink}
        text={copiedToClipboard ? 'Copied' : 'Copy link'}
        type="outline"
        icon={copiedToClipboard ? <CopiedLinkIcon /> : <CopyLinkIcon />}
        disabled={!isFetched}
        width="100%"
      />
    </div>
  );
};
