import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import c from 'classnames';

interface Props {
  videoItem: Video;
}

const AdditionalServices = ({ videoItem }: Props) => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.currentTarget.checked);
  };

  const onKeyDown = (e) => {
    if (
      (e.keyCode <= 57 && e.keyCode >= 48) ||
      e.keyCode === 186 ||
      e.keyCode === 8
    ) {
      return true;
    }
    return e.preventDefault();
  };

  return (
    <div className="text-gray-700">
      <div className="text-base ">Additional services</div>
      <div className="h-9 flex flex-row items-center">
        <label
          className="cursor-pointer font-normal mr-8"
          htmlFor={videoItem.id}
        >
          <input
            onChange={onChange}
            id={videoItem.id}
            checked={checked}
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
              onKeyDown={onKeyDown}
              className="border-blue-300 border outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
              type="text"
              pattern="[0-9]"
              defaultValue="00:00"
            />
            To:
            <input
              onKeyDown={onKeyDown}
              className="border-blue-300 border outline-none ml-2 w-16 h-full px-2 text-center"
              type="text"
              defaultValue={videoItem.playback.duration.format('mm:ss')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalServices;
