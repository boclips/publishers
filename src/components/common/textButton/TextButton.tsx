import Button from '@boclips-ui/button';
import React from 'react';
import c from 'classnames';
import s from './style.module.less';

interface Props {
  onClick: () => void;
  text: string;
  icon?: React.ReactElement;
  fontSize?: 'small' | 'large';
}

export const TextButton = ({ onClick, text, icon, fontSize }: Props) => (
  <div className={c(s.textButton, { [s.smallFont]: fontSize === 'small' })}>
    <Button onClick={onClick} text={text} icon={icon} />
  </div>
);
