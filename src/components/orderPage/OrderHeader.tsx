import { Link } from 'react-router-dom';
import React from 'react';
import Arrow from '../../resources/icons/grey-arrow.svg';

export const OrderHeader = ({ id }) => {
  return (
    <>
      <div className="flex flex-row items-end mb-4">
        <Link
          to="/orders"
          className="text-sm mr-4 text-gray-800 hover:text-gray-800"
        >
          Your orders
        </Link>
        <Arrow className="w-2  mr-4 self-center" />
        <div className="text-base">{`Order ${id}`}</div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-4">{`Order ${id}`}</div>
    </>
  );
};
