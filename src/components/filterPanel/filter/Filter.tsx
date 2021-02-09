import React, { useEffect, useState } from 'react';
import { FilterHeader } from 'src/components/filterPanel/filter/FilterHeader';
import { FilterOptionList } from 'src/components/filterPanel/filter/FilterOptionList';
import { useSearchQueryLocationParams } from 'src/hooks/useLocationParams';
import { FilterOption } from 'src/types/FilterOption';

interface Props {
  title: string;
  options: FilterOption[];
  filterName: string;
  handleChange: (filter: string, values: string[]) => void;
  filtersSearch?: React.ReactNode;
  handleFilterToggle?: (isOpen: boolean) => void;
}

export const Filter = ({
  title,
  options = [],
  filterName,
  handleChange,
  filtersSearch,
  handleFilterToggle,
}: Props) => {
  const [searchLocation] = useSearchQueryLocationParams();
  const [open, setOpen] = useState<boolean>(true);
  const [filtersTouched, setFiltersTouched] = useState<boolean>(false);

  const initialValues = searchLocation.filters[filterName];
  const [optionStates, setOptionStates] = useState<string[]>(
    initialValues || [],
  );

  useEffect(() => {
    setOptionStates(searchLocation.filters[filterName])
    if (filtersTouched) {
      handleChange(filterName, optionStates);
    }
  }, [filtersTouched, filterName, optionStates, handleChange]);

  const onSelectOption = (_, item: string) => {
    setFiltersTouched(true);
    if (optionStates.includes(item)) {
      setOptionStates((states) => states.filter((value) => value !== item));
      handleChange(filterName, optionStates);
    } else {
      setOptionStates((states) => [...states, item]);
      handleChange(filterName, optionStates);
    }
  };

  const toggleFilter = () => {
    setOpen(!open);
    if (handleFilterToggle) {
      handleFilterToggle(!open);
    }
  };

  return (
    <div className="bg-blue-100 mt-6 p-4 border-solid border border-blue-300 rounded">
      <FilterHeader
        text={title}
        filterIsOpen={open}
        toggleFilter={toggleFilter}
      />
      {open && (
        <>
          {filtersSearch}
          <FilterOptionList options={options} onSelect={onSelectOption} />
        </>
      )}
    </div>
  );
};
