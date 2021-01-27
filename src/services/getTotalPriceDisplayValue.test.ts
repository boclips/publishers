import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { getTotalPriceDisplayValue } from 'src/services/getTotalPriceDisplayValue';

describe('get totalPrice display value', () => {
  it('provides correct value for multiple videos', () => {
    const videos = [
      VideoFactory.sample({ price: { amount: 200.25, currency: 'USD' } }),
      VideoFactory.sample({ price: { amount: 530.5, currency: 'USD' } }),
    ];

    expect(getTotalPriceDisplayValue(videos)).toBe('$730.75');
  });

  it('returns empty value for the unlikely scenario of no videos', () => {
    expect(getTotalPriceDisplayValue([])).toBe('');
  });

  it('returns empty value for the unlikely scenario of undefined', () => {
    expect(getTotalPriceDisplayValue(undefined)).toBe('');
  });

  it('skips videos without prices', () => {
    const videos = [
      VideoFactory.sample({ price: undefined }),
      VideoFactory.sample({ price: { amount: 530.5, currency: 'USD' } }),
    ];
    expect(getTotalPriceDisplayValue(videos)).toBe('$530.50');
  });

  it('returns empty value when none of videos have prices', () => {
    const videos = [VideoFactory.sample({ price: undefined })];
    expect(getTotalPriceDisplayValue(videos)).toBe('');
  });
});
