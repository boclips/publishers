import React from 'react';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import c from 'classnames';

interface Props {
  option: Facet;
  selected: boolean;
  onSelect: (event, item) => void;
}
export const FilterOption = ({ option, selected, onSelect }: Props) => {
  return (
    <div key={option.id} className="mb-3">
      <label
        htmlFor={option.id}
        className="flex items-center cursor-pointer text-gray-700"
      >
        <input
          onChange={(event) => onSelect(event, option.id)}
          className="form-checkbox checked:bg-blue-800 w-5 h-5 hover:border-blue-800 hover:border-solid border-2"
          type="checkbox"
          value={option.id}
          checked={selected}
          data-qa={`${option.id}-checkbox`}
          id={option.id}
        />
        <span
          className={c('text-sm ml-2 flex-grow', {
            'font-medium': selected,
          })}
        >
          {option.name}
        </span>
        <span className="text-blue-700">{option.hits}</span>
      </label>
    </div>
  );
};
