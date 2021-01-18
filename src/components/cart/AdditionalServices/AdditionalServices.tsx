import React, { useState } from 'react';
import { Video } from 'boclips-api-client/dist/types';
import c from 'classnames';

interface Props {
  videoItem: Video;
}

const AdditionalServices = ({ videoItem }: Props) => {
  const [checked, setChecked] = useState(false);
  const [trim, setTrim] = useState({
    from: '00:00',
    to: videoItem.playback.duration.format('mm:ss'),
  });

  const onChangeCheckbox = (e) => {
    setChecked(e.currentTarget.checked);
  };

  const onChangeTrimInput = (e) => {
    const regExp = /^[0-9:\b]{0,5}$/;
    if (e.currentTarget.value === '' || regExp.test(e.currentTarget.value)) {
      const value = { [e.currentTarget.id]: e.currentTarget.value };
      setTrim((prevState) => ({
        ...prevState,
        ...value,
      }));
    }
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
            onChange={onChangeCheckbox}
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
              id="from"
              aria-label="trim-from"
              onChange={onChangeTrimInput}
              className="border-blue-300 border outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
              type="text"
              value={trim.from}
            />
            To:
            <input
              aria-label="trim-to"
              id="to"
              onChange={onChangeTrimInput}
              className="border-blue-300 border outline-none w-16 h-full ml-2 mr-6 px-2 text-center"
              type="text"
              value={trim.to}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalServices;
