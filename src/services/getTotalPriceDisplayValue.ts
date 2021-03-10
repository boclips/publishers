import { Video } from 'boclips-api-client/dist/types';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { getBrowserLocale } from 'src/services/getBrowserLocale';

export const getTotalPriceDisplayValue = (videos: Video[]): string => {
  const videosWithPrices = videos?.filter((video) => Boolean(video.price));

  if (!videosWithPrices || videosWithPrices.length < 1) {
    return '';
  }

  const totalPrice = videosWithPrices
    .map((video) => video.price.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  return createPriceDisplayValue(
    totalPrice,
    videosWithPrices[0].price.currency,
    getBrowserLocale(),
  );
};
