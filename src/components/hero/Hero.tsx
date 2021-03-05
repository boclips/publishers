import React from 'react';
import s from './style.module.less';

interface Props {
  row?: string;
  title: string;
  description?: string;
  moreDescription?: string;
  icon: React.ReactNode;
  actions?: React.ReactNode;
}

export const Hero = ({
  title,
  description,
  actions,
  icon,
  moreDescription,
  row = '2',
}: Props) => {
  return (
    <>
      <div
        className={`${s.heroWrapper} col-start-1 col-end-25 row-start-${row} row-end-${row} bg-primary-light rounded-lg`}
      />
      <div
        className={`${s.svgWrapper} col-start-3 col-end-12 row-start-${row} row-end-${row} flex justify-center items-center`}
      >
        {icon}
      </div>
      <div
        className={`${s.heroCopyWrapper} col-start-12 col-end-23 lg:col-start-12 lg:col-end-21 row-start-${row} row-end-${row} text-blue-800 flex flex-col justify-center`}
      >
        <h2 className="blue-800 font-medium text-4xl">{title}</h2>
        {description && <p className="text-gray-800 text-lg">{description}</p>}
        {moreDescription && (
          <p className="text-gray-800 text-lg mt-6">{moreDescription}</p>
        )}
        {actions && (
          <div className="mt-8 flex flex-row items-center">{actions}</div>
        )}
      </div>
    </>
  );
};
