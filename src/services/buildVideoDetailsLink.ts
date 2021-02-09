import { Video } from 'boclips-api-client/dist/types';
import { Constants } from 'src/AppConstants';

export const buildVideoDetailsLink = (video: Video): string => {
  return `${Constants.HOST}/videos/${video.id}`;
};
