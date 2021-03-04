import React from 'react';

interface Props {
  rowsSetup: string;
  dataQa?: string;
  children: React.ReactNode;
}

export const Layout = ({ rowsSetup, children, dataQa }: Props) => (
  <div
    data-qa={dataQa}
    className={`container grid ${rowsSetup} grid-cols-24 gap-6`}
  >
    {children}
  </div>
);
