import { AnalyticsService } from 'src/services/analytics/AnalyticsService';

const analyticsService = new AnalyticsService(window.Appcues);

export default class AnalyticsFactory {
  public static getAppcues(): AnalyticsService {
    return analyticsService;
  }
}
