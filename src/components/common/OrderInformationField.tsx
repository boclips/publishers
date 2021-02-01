import React, { ReactElement } from 'react';

interface ItemProps {
  label: string;
  value: ReactElement;
}

export const OrderInformationField = ({ label, value }: ItemProps) => {
  return (
    <div className="flex flex-col text-sm my-8 mr-20">
      <div className="text-sm text-grey-700 font-medium">{label}</div>
      {value}
    </div>
  );
};
