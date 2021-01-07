import { Link } from 'react-router-dom';
import RightArrow from 'src/resources/icons/filter-arrow-right.svg';
import React from 'react';

export const OrderHeader = ({ id }) => {
  return (
    <>
      <div className="flex flex-row items-end mb-4">
        <Link to="/orders" className="text-sm mr-4 text-black">
          Your orders
        </Link>
        <RightArrow className="w-2  mr-4 self-center" />
        <div className="text-base">{`Order ${id}`}</div>
      </div>
      <div className="text-2xl font-bold text-grey-800 mb-4">{`Order ${id}`}</div>
    </>
  );
};
