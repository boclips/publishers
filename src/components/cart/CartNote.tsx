import React, { useEffect, useState } from 'react';
import { useDebounce } from 'src/hooks/useDebounce';

interface Props {
  currentNote: string;
  onUpdateNote: (note: string) => void;
}
export const CartNote = ({ currentNote, onUpdateNote }: Props) => {
  const [note, setNote] = useState(currentNote);
  const debouncedValue = useDebounce(note, 1500);

  const handleOnChange = (e: any) => {
    setNote(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue || debouncedValue === '') {
      onUpdateNote(debouncedValue);
    }
  }, [debouncedValue, onUpdateNote]);

  return (
    <textarea
      className="border-2 border-blue-300 rounded text-gray-600 h-52 p-3 bg-scroll text-md resize-none"
      placeholder="Add a note about this order (optional)"
      onChange={handleOnChange}
      value={note}
      rows={2}
    />
  );
};
