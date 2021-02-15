import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import Navbar from 'src/components/layout/Navbar';
import Footer from 'src/components/layout/Footer';

export const Loading = () => (
  <>
    <div className="grid grid-rows-orders-view grid-cols-container gap-8">
      <Navbar showSearchBar />
      <h3 className="flex justify-center mt-16 text-lg">
        <LoadingOutlined className="mr-2" /> Loading
      </h3>
    </div>
  </>
);
