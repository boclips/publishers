import InfoIcon from 'resources/icons/info.svg';
import React from 'react';

export const VideoAdditionalServices = () => {
  return (
    <div className="mt-4 bg-blue-100 border-blue-400 border-2 p-6 rounded text-gray-800">
      <div className="flex flex-row font-medium text-base items-center mb-2 text-gray-900">
        <InfoIcon />
        <div className="ml-2">Additional services</div>
      </div>
      <div className="text-sm">
        Captions, transcripts, video trimming, and other editing requests are
        available upon request from your shopping cart. All additional services
        are available free of charge.
      </div>
    </div>
  );
};
