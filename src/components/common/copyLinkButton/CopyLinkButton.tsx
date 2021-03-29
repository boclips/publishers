import React from 'react';
import CopyLinkIcon from 'src/resources/icons/copy-link-icon.svg';
import CopiedLinkIcon from 'src/resources/icons/copied-link-icon.svg';
import Button from '@boclips-ui/button';
import s from './style.module.less';

interface Props {
  title: string;
  onCopy?: () => void;
  link: string;
  width?: string;
  disabled?: boolean;
  dataQa?: string;
}

export const CopyLinkButton = ({
  title,
  onCopy,
  link,
  width,
  disabled,
  dataQa,
}: Props) => {
  const [copiedToClipboard, setCopiedToClipboard] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedToClipboard(true);

      if (onCopy) {
        onCopy();
      }
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
        data-qa={dataQa}
        onClick={handleClick}
        text={copiedToClipboard ? 'Copied' : title}
        type="outline"
        icon={copiedToClipboard ? <CopiedLinkIcon /> : <CopyLinkIcon />}
        disabled={disabled}
        width="100%"
      />
    </div>
  );
};
