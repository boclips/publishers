import { Video } from 'boclips-api-client/dist/types';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';

export const getTotalPriceDisplayValue = (videos: Video[]): string => {
  if (!videos || videos.length < 1) {
    return '';
  }

  const totalPrice = videos
    .map((video) => video.price!!.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  return createPriceDisplayValue(
    totalPrice,
    videos[0].price!!.currency,
    navigator.language,
  );
};
