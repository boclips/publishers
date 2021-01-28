import { Constants } from 'src/AppConstants';

export const trackPageRendered = (location, apiClient) => {
  return apiClient.events.trackPageRendered({
    url: `${Constants.HOST}${location.pathname}${location.search}`,
  });
};
