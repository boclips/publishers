import React, { ReactElement } from 'react';

interface ItemProps {
  fieldName: string;
  children: ReactElement | 'string';
}

export const OrderInformationField = ({ fieldName, children }: ItemProps) => {
  return (
    <div className="flex flex-col flex-grow text-sm px-2">
      <div className="text-sm text-grey-700 font-medium">{fieldName}</div>
      {children}
    </div>
  );
};
