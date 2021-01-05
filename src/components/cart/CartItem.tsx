import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import { VideoPlayer } from 'src/components/videoCard/VideoPlayer';
import c from 'classnames';

interface Props {
  item: Video;
}

const CartItem = ({ item }: Props) => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.currentTarget.checked);
  };

  return (
    <div className="flex py-3 flex-row border-t-2 border-blue-300 justify-start ">
      <VideoPlayer video={item} />

      <div className="flex flex-col w-full ml-3">
        <div className="text-md text-gray-900">{item.title}</div>

        <div className="text-gray-700">
          <div className="text-base ">Additional services</div>
          <div className="h-9 flex flex-row items-center">
            <label
              className="cursor-pointer font-normal mr-8"
              htmlFor={item.id}
            >
              <input
                onChange={onChange}
                id={item.id}
                type="checkbox"
                className="form-checkbox checked:bg-blue-800 w-5 h-5 mr-2 hover:border-blue-800 hover:border-solid border-2 cursor-pointer"
              />
              <span
                className={c({
                  'font-medium': checked,
                })}
              >
                Trim video
              </span>
            </label>
            {checked && (
              <div className="h-full flex items-center font-normal">
                From:
                <input
                  className="border-blue-300 border outline-none w-12 h-full ml-2 mr-6 px-2"
                  type="text"
                />
                To:
                <input
                  className="border-blue-300 border outline-none ml-2 w-12 h-full px-2"
                  type="text"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
