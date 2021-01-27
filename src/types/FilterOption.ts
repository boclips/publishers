import { ReactElement } from 'react';

export interface FilterOption {
  id: string;
  name: string;
  hits: number;
  isSelected: boolean;
}

export interface FilterOptionWithLabel {
  id: string;
  label: ReactElement;
  hits: number;
  isSelected: boolean;
}
