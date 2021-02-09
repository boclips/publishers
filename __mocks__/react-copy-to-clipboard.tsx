import React from 'react';

export const CopyToClipboard = (props) => (
  // eslint-disable-next-line
  <div onClick={props.onCopy} data-qa={props.text}>{props.children}</div>
);
