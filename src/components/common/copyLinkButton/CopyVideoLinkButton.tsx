import Button from '@boclips-ui/button';
import { Video } from 'boclips-api-client/dist/types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyLinkIcon from 'src/resources/icons/copy-link-icon.svg';
import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';
import { buildVideoDetailsLink } from 'src/services/buildVideoDetailsLink';
import { useGetUserQuery } from 'src/hooks/api/userQuery';
import s from './style.module.less';
import { trackCopyVideoShareLink } from '../analytics/Analytics';

interface Props {
  video: Video;
}

export const CopyVideoLinkButton = ({ video }: Props) => {
  const apiClient = useBoclipsClient();
  const { data: user, isFetched } = useGetUserQuery();

  return (
    <>
      {isFetched && (
        <div className={`h-12 flex justify-end mt-2 ${s.copyLinkButton} mr-2`}>
          <CopyToClipboard text={buildVideoDetailsLink(video, user)}>
            <Button
              onClick={() => trackCopyVideoShareLink(video, apiClient)}
              text="Copy link"
              type="outline"
              width="100%"
              icon={<CopyLinkIcon />}
            />
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};
