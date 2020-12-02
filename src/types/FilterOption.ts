import { ReactElement } from 'react';

export interface FilterOption {
  id: string;
  label: ReactElement;
  hits: number;
}
