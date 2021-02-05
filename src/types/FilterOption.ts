import { ReactElement } from 'react';
import { FilterKey } from 'src/types/search/FilterKey';

export interface FilterOption {
  id: string;
  name: string;
  hits: number;
  isSelected: boolean;
  label: ReactElement;
  key: FilterKey;
}
