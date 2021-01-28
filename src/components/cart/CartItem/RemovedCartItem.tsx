import React from 'react';
import SpinnerSVG from 'src/resources/icons/spinner.svg';
import DoneSpinnerSVG from 'src/resources/icons/done-spinner.svg';
import c from 'classnames';

interface Props {
  state: 'loading' | 'done';
}

export const RemovedCartItem = ({ state }: Props) => {
  return (
    <div className=" h-32 bg-white transition-all absolute w-7/12 z-10">
      <div className="flex justify-center transition-opacity duration-1000 mt-4">
        <DoneSpinnerSVG
          className={c(
            'absolute opacity-0 transition-opacity duration-5000 ease-in',
            {
              'opacity-100': state === 'done',
            },
          )}
        />
        <SpinnerSVG
          className={c(
            'absolute animate-spin transition-opacity duration-500 ease-in',
            { hidden: state !== 'loading' },
          )}
        />
      </div>
      <span
        className={c(
          'flex justify-center transition-opacity duration-1000 opacity-0 mt-16 ',
          { 'opacity-100': state === 'done' },
        )}
      >
        Video has been removed from your cart
      </span>
    </div>
  );
};
