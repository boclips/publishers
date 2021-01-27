import { ReactElement } from 'react';

export interface FilterOption {
  id: string;
  name: string;
  hits: number;
  isSelected: boolean;
  label: ReactElement;
}
