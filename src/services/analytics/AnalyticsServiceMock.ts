import Appcues from 'src/services/analytics/Appcues';

export const analyticsMock = ({
  track: jest.fn(),
  identify: jest.fn(),
  page: jest.fn(),
} as any) as Appcues;
