import { Constants } from 'src/AppConstants';
import { AnalyticsService } from 'src/services/analytics/AnalyticsService';
import Appcues from 'src/services/analytics/Appcues';
import { AnalyticsUserProfile } from 'src/services/analytics/AnalyticsUserProfile';

let analyticsService: AnalyticsService;

describe('AnalyticsService', () => {
  let mockAppcues: Appcues;

  it('sets a user id', () => {
    mockAppcues = {
      track: jest.fn(),
      page: jest.fn(),
      identify: jest.fn(),
    };
    analyticsService = new AnalyticsService(mockAppcues);

    const userProfile: AnalyticsUserProfile = {
      id: 'testId',
      firstName: 'test first name',
      email: 'test@test.com',
    };
    analyticsService.identify(userProfile);
    expect(mockAppcues.identify).toHaveBeenCalledWith('testId', {
      name: 'test first name',
      email: 'test@test.com',
      planType: Constants.APPCUES_PLAN_TYPE,
    });
  });

  it(`sends a page rendered event`, () => {
    mockAppcues = {
      track: jest.fn(),
      page: jest.fn(),
      identify: jest.fn(),
    };
    analyticsService = new AnalyticsService(mockAppcues);

    analyticsService.sendEvent('PAGE_RENDERED');

    expect(mockAppcues.track).toHaveBeenCalledWith('PAGE_RENDERED', {});
  });
});
