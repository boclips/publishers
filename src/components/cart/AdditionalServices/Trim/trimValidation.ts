import { Video } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { BASE_DURATION } from './Trim';

interface Trim {
  to?: string;
  from?: string;
}

export const isTrimFromValid = (trim: Trim, video: Video = null): boolean => {
  const { to, from } = trim;

  if (!from) {
    return false;
  }

  if (!isMatchingTimeFormat(from)) {
    return false;
  }

  if (from === to) {
    return false;
  }

  if (!!to && durationInSeconds(from) > durationInSeconds(to)) {
    return false;
  }

  if (isFullDuration(trim, video)) {
    return false;
  }

  return true;
};

export const isTrimToValid = (trim: Trim, video: Video = null) => {
  const { from, to } = trim;

  if (!to) {
    return false;
  }

  if (!isMatchingTimeFormat(to)) {
    return false;
  }

  if (from === to) {
    return false;
  }

  if (!!from && durationInSeconds(from) > durationInSeconds(to)) {
    return false;
  }

  if (isFullDuration(trim, video)) {
    return false;
  }

  if (durationInSeconds(trim.to) > video.playback.duration.asSeconds()) {
    return false;
  }

  return true;
};

const isMatchingTimeFormat = (time: string) => time.match(/(^\d+:[0-5]\d$)/);

const isFullDuration = (trim: Trim, video: Video) =>
  isBaseDuration(trim.from) &&
  durationInSeconds(trim.to) === video.playback.duration.asSeconds();

const durationInSeconds = (time: string): number => {
  const minutesAndSeconds = time.split(':');
  return +minutesAndSeconds[0] * 60 + +minutesAndSeconds[1];
};

const isBaseDuration = (value: string) => BASE_DURATION === value;
