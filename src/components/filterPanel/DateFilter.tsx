import ReleaseDateFilter from '@boclips-ui/release-date-filter';
import React, { useState } from 'react';
import { FilterHeader } from 'src/components/filterPanel/filter/FilterHeader';
import { DateFilters } from 'src/components/filterPanel/FilterPanel';
import { FilterKey } from 'src/types/search/FilterKey';
import dayjs from 'dayjs';

interface Props {
  releaseDates?: DateFilters;
  handleChange: (filterKey: FilterKey, value: string[]) => void;
}

export const DateFilter = ({ releaseDates, handleChange }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleFilter = () => {
    setOpen(!open);
  };

  const releasedFrom = releaseDates.from || null;
  const releasedTo = releaseDates.to || null;

  const setToDateFilter = (date: dayjs.Dayjs) => {
    handleChange('release_date_to', [date.format('YYYY-MM-DD')]);
  };

  const setFromDateFilter = (date: dayjs.Dayjs) => {
    handleChange('release_date_from', [date.format('YYYY-MM-DD')]);
  };

  return (
    <div className="bg-blue-100 mt-6 p-4 border-solid border border-blue-300 rounded">
      <FilterHeader
        text="Release date"
        filterIsOpen={open}
        toggleFilter={toggleFilter}
      />
      <div className="mt-2 w-full">
        <div data-qa="release_date_from">
          <div className="my-2">From:</div>
          <ReleaseDateFilter
            releaseDate={releasedFrom[0]}
            onChange={setFromDateFilter}
          />
        </div>
        <div data-qa="release_date_to">
          <div className="my-2">To:</div>
          <ReleaseDateFilter
            releaseDate={releasedTo[0]}
            onChange={setToDateFilter}
          />
        </div>
      </div>
    </div>
  );
};
