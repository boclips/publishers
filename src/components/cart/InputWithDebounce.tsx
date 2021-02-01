import React, { useEffect, useState } from 'react';
import { useDebounce } from 'src/hooks/useDebounce';

interface Props {
  currentValue: string | undefined;
  onUpdate: (note: string) => void;
  placeholder: string;
}
export const InputWithDebounce = ({
  currentValue,
  onUpdate,
  placeholder,
}: Props) => {
  const [value, setValue] = useState(currentValue);
  const debouncedValue = useDebounce(value, 1000);

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue || debouncedValue === '') {
      onUpdate(debouncedValue);
    }
  }, [debouncedValue, onUpdate]);

  return (
    <textarea
      className="border-2 border-blue-300 rounded  placeholder-gray-600 text-gray-900 h-52 p-3 bg-scroll resize-none"
      placeholder={placeholder}
      onChange={handleOnChange}
      value={value}
      rows={2}
    />
  );
};
