import { Constants } from 'src/AppConstants';
import Appcues from 'src/services/analytics/Appcues';
import { AnalyticsUserProfile } from 'src/services/analytics/AnalyticsUserProfile';

export class AnalyticsService {
  private appcuesInstance?: Appcues;

  public constructor(appcues?: Appcues) {
    if (!appcues) {
      console.error('Appcues is not defined');
    } else {
      this.appcuesInstance = appcues;
    }
  }

  public identify(userProfile: AnalyticsUserProfile) {
    if (this.appcuesInstance) {
      this.appcuesInstance.identify(userProfile.id, {
        name: userProfile.firstName,
        email: userProfile.email,
        planType: Constants.APPCUES_PLAN_TYPE,
      });
    }
  }

  public pageChanged() {
    if (this.appcuesInstance) {
      this.appcuesInstance.page();
    }
  }

  public sendEvent(type: string) {
    if (this.appcuesInstance) {
      this.appcuesInstance.track(type, {});
    }
  }
}
