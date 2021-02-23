import { BASE_DURATION } from './Trim';

interface Trim {
  to?: string;
  from?: string;
}

/**
 *
 * I think we should convert the strings to numbers in seconds
 * We should probably check if the to value is greater than the length of the video
 * Also I don't think isTrimToValid should depend on from value, probably a tidy up
 */
export const isTrimFromValid = (trim: Trim): boolean => {
  const { to, from } = trim;

  if (!from) {
    return false;
  }

  if (isBaseDuration(from) && isBaseDuration(to)) {
    return false;
  }

  if (from.match(/(^\d+:[0-5]\d$)/)) {
    return true;
  }

  return false;
};

export const isTrimToValid = (trim: Trim) => {
  const { to } = trim;

  if (!to) {
    return false;
  }

  if (isBaseDuration(to)) {
    return false;
  }

  if (to.match(/(^\d+:[0-5]\d$)/)) {
    return true;
  }

  return true;
};

const isBaseDuration = (value: string) => {
  return BASE_DURATION === value;
};
