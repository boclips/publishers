import { BoclipsClient } from 'boclips-api-client';
import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { Constants } from 'src/AppConstants';

export const trackPageRendered = (location, apiClient) => {
  return apiClient.events.trackPageRendered({
    url: `${Constants.HOST}${location.pathname}${location.search}`,
  });
};

export const trackCopyVideoShareLink = (
  video: Video,
  apiClient: BoclipsClient,
) => {
  apiClient.events.trackVideoInteraction(video, 'COPY_SHARE_LINK');
};
