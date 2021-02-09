import Button from '@boclips-ui/button';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyLinkIcon from 'src/resources/icons/copy-link-icon.svg';

interface Props {
  link: string;
}

export const CopyLinkButton = ({ link }: Props) => (
  <div className="mt-1">
    <CopyToClipboard text={link}>
      <Button
        onClick={() => {}}
        text="Copy link"
        type="outline"
        height="80%"
        icon={<CopyLinkIcon />}
      />
    </CopyToClipboard>
  </div>
);
