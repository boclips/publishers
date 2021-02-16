import { AnalyticsService } from 'src/services/analytics/AnalyticsService';

export const analyticsMock = {
  sendEvent: jest.fn(),
  identify: jest.fn(),
  pageChanged: jest.fn(),
} as AnalyticsService;
